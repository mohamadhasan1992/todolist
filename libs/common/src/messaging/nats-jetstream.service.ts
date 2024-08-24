// src/infrastructure/messaging/nats-jetstream.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, JetStreamManager, NatsConnection, JetStreamClient, StringCodec } from 'nats';

@Injectable()
export class NatsJetStreamService implements OnModuleInit, OnModuleDestroy {
  private natsConnection: NatsConnection;
  private jsm: JetStreamManager;

  constructor(private readonly natsUrl: string) {}

  async onModuleInit() {
    this.natsConnection = await connect({ servers: this.natsUrl });
    this.jsm = await this.natsConnection.jetstreamManager();
  }

  getJetStream(): JetStreamClient {
    return this.natsConnection.jetstream();
  }

  async publish(subject: string, message: any) {
    const js = this.natsConnection.jetstream();
    const sc = StringCodec();
    const messageString = JSON.stringify(message);
    await js.publish(subject, sc.encode(messageString));
  }


  async onModuleDestroy() {
    await this.natsConnection.close();
  }
}
