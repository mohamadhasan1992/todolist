import { KafkaTopics } from '@app/common';
import { KafkaService } from '@app/common/messaging/kafka-streaming.service';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApiGatewayKafkaService {
  private pendingResponses: Map<string, any> = new Map();

  constructor(private readonly kafkaService: KafkaService) {
    // Initialize response listener
    this.kafkaService.createConsumer('api-gateway-group', KafkaTopics.KafkaAuthenticationResponseTopic, async (payload) => {
      const { value } = payload.message;
      const response = JSON.parse(value.toString());
      const correlationId = response.correlationId;
      if (this.pendingResponses.has(correlationId)) {
        this.pendingResponses.get(correlationId).resolve(response);
        this.pendingResponses.delete(correlationId);
      }
    });
  }

  async sendRequestToAuthService(data: any): Promise<any> {
    const correlationId = uuidv4();
    const responsePromise = new Promise((resolve, reject) => {
      this.pendingResponses.set(correlationId, { resolve, reject });
    });

    await this.kafkaService.sendMessage(KafkaTopics.KafkaAuthenticationRequestTopic, [{ ...data, correlationId }]);
    
    // Handle timeout
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000));
    return Promise.race([responsePromise, timeoutPromise]);
  }
}
