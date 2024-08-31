import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { KafkaService } from '@app/common/messaging/kafka-streaming.service';
import { InventoryActionEnum, KafkaTopics } from '@app/common';
import { CreateProductCommand } from '../commands/product/create-product.command';
import { DeleteProductCommand } from '../commands/product/delete-product.command';
import { UpdateProductCommand } from '../commands/product/update-product.command';



@Injectable()
export class InventoryKafkaService implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly commandBus: CommandBus
  ) {}

  async onModuleInit() {
    await this.kafkaService.createConsumer('inventory-group', KafkaTopics.KafkaInventoryRequestTopic, async (payload) => {
      const { value } = payload.message;
      const command = JSON.parse(value.toString());
      const { correlationId } = command;

      try {
        const commandResponse = await this.handleCommand(command);
        const result = {
          success: true,
          data: commandResponse
        };
        await this.kafkaService.sendMessage(KafkaTopics.KafkaInventoryResponseTopic, [{ ...result, correlationId }]);
      } catch (err) {
        const result = {
          success: false,
          data: null,
          message: err.message
        };
        await this.kafkaService.sendMessage(KafkaTopics.KafkaInventoryResponseTopic, [{ ...result, correlationId }]);
      }
    });
  }

  private async handleCommand(command: any) {
    switch (command.action) {
      case InventoryActionEnum.CreateProduct:
        return await this.commandBus.execute(new CreateProductCommand(command));
      case InventoryActionEnum.UpdateProduct:
        return await this.commandBus.execute(new UpdateProductCommand(command, command.productId));
      case InventoryActionEnum.DeleteProduct:
        return this,this.commandBus.execute(new DeleteProductCommand({id: command.productId}))
      default:
        throw new Error('Invalid action');
    }
  }
}
