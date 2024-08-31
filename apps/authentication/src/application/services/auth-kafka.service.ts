import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { KafkaService } from '@app/common/messaging/kafka-streaming.service';
import { AuthActionsEnum, KafkaTopics } from '@app/common';
import { SignUpCommand } from '../commands/auth/signup.command';
import { LoginCommand } from '../commands/auth/login.command';

@Injectable()
export class AuthKafkaService implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly commandBus: CommandBus
  ) {}

  async onModuleInit() {
    await this.kafkaService.createConsumer('auth-group', KafkaTopics.KafkaAuthenticationRequestTopic, async (payload) => {
      const { value } = payload.message;
      const command = JSON.parse(value.toString());
      const { correlationId } = command;

      try {
        const commandResponse = await this.handleCommand(command);
        const result = {
          success: true,
          data: commandResponse
        };
        await this.kafkaService.sendMessage(KafkaTopics.KafkaAuthenticationResponseTopic, [{ ...result, correlationId }]);
      } catch (err) {
        const result = {
          success: false,
          data: null,
          message: err.message
        };
        await this.kafkaService.sendMessage(KafkaTopics.KafkaAuthenticationResponseTopic, [{ ...result, correlationId }]);
      }
    });
  }

  private async handleCommand(command: any) {
    switch (command.action) {
      case AuthActionsEnum.Signup:
        return await this.commandBus.execute(new SignUpCommand(command));
      case AuthActionsEnum.Login:
        return await this.commandBus.execute(new LoginCommand(command));
      default:
        throw new Error('Invalid action');
    }
  }
}
