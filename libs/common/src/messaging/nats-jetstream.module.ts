import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NatsJetStreamService } from './nats-jetstream.service';
import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';

@Module({})
export class NatsJetStreamModule {
  static register(subjects: string[]): DynamicModule {
    return {
      module: NatsJetStreamModule,
      imports: [
        ConfigModule,
        NatsJetStreamTransport.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            connectionOptions: {
              servers: configService.get<string>('NATS_SERVER_URL'),
              name: 'api-gateway-publisher',
            },
            streams: subjects.map(subject => ({
              name: subject,
              subjects: [`${subject}.>`], // Configures streams based on subjects
            })),
          }),
        }),
      ],
      providers: [NatsJetStreamService],
      exports: [NatsJetStreamService],
    };
  }
}
