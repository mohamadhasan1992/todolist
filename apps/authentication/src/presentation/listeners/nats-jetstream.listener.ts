// src/authentication/nats-listener.service.ts
import { NatsJetStreamService } from '@app/common/messaging/nats-jetstream.service';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { JetStreamSubscription, StringCodec } from 'nats';

@Injectable()
export class NatsListenerService implements OnModuleInit, OnModuleDestroy {
  private subscription: JetStreamSubscription;

  constructor(private readonly natsJetStreamService: NatsJetStreamService) {}

  async onModuleInit() {
    const js = this.natsJetStreamService.getJetStream();

    this.subscription = await js.pullSubscribe('authentication.command.*', {
      config: {
        durable_name: 'auth-service-durable',
      },
    });

    this.processMessages();
  }

  async processMessages() {
    for await (const msg of this.subscription) {
      const messageData = JSON.parse(StringCodec().decode(msg.data));
      console.log('Received command:', messageData);

      // Handle the command (e.g., login, register, etc.)
      this.handleCommand(messageData);

      msg.ack();
    }
  }

  private handleCommand(command: any) {
    // Implement your command handling logic here
    switch (command.type) {
      case 'LOGIN':
        // Handle login command
        break;
      case 'REGISTER':
        console.log("REGISTER")
        console.log("command", command)
        // Handle register command
        break;
      // Add other command types as needed
    }
  }

  async onModuleDestroy() {
    if (this.subscription) {
      await this.subscription.drain();
    }
  }
}
