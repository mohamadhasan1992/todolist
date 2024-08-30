import { Injectable, Inject } from '@nestjs/common';
import { Kafka, Producer, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaService {
  private producer: Producer;
  
  constructor(@Inject('KAFKA_CLIENT') private readonly kafka: Kafka) {
    this.producer = this.kafka.producer();
    this.producer.connect();
  }

  async sendMessage(topic: string, messages: any[]): Promise<void> {
    await this.producer.send({
      topic,
      messages: messages.map((message) => ({ value: JSON.stringify(message) })),
    });
  }

  async createConsumer(groupId: string, topic: string, messageHandler: (payload: EachMessagePayload) => Promise<void>) {
    const consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async (payload) => {
        await messageHandler(payload);
      },
    });
  }
}
