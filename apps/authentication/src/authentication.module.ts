import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisOptions } from '@app/common/config/redisOptions';
import { CacheModule } from '@nestjs/cache-manager';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@app/common/database/database.module';
import { UserSchema } from './infrustructure/database/schema/user.schema';
import { SchemaFactory } from '@nestjs/mongoose';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserEntityFactory } from './domain/entityFactory/UserEntity.factory';
import { AuthCommandHandlers } from './application/commands';
import { UserSchemaFactory } from './infrustructure/database/schema-factory/user-schema.factory';
import { AuthService } from './application/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthQueryHandlers } from './application/queries';
import * as Joi from 'joi';
import { UserQueryEntityRepository } from './infrustructure/repositories/user-query-entity.repository';
import { UserCommandEntityRepository } from './infrustructure/repositories/user-command-entity.repository';
import { KafkaModule } from '@app/common/messaging/kfaka-streaming.module';
import { KafkaService } from '@app/common/messaging/kafka-streaming.service';
import { KafkaTopics } from '@app/common';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDISE_PORT: Joi.string().required(),
        MONGO_QUERY_URI: Joi.string().required(),
        MONGO_COMMAND_URI: Joi.string().required(),
      })
    }),
    KafkaModule.forRoot({
      clientId: 'auth-service',
      brokers: ['kafka:9092'],
    }),
    JwtModule.registerAsync({
      useFactory: async(configService: ConfigService) => ({
        import: [ConfigModule],
        secret: configService.getOrThrow<string>("JWT_SECRET"),
        signOptions: { expiresIn:  configService.getOrThrow<string>("JWT_EXPIRES_IN")}
      }),
      inject: [ConfigService]
    }),
    CqrsModule,
    DatabaseModule.forRootAsync('command', {
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_COMMAND_URI'),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule.forRootAsync('query', {
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_QUERY_URI'),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule.forFeature([
      {
        name: "queryUser",
        schema: SchemaFactory.createForClass(UserSchema)
      },
    ], 
    "query"
    ),
    DatabaseModule.forFeature([
      {
        name: "commandUser",
        schema: SchemaFactory.createForClass(UserSchema)
      },
    ], 
    "command"
    ),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {provide: "UserQueryRepository", useClass: UserQueryEntityRepository},
    {provide: "UserCommandRepository", useClass: UserCommandEntityRepository},
    UserEntityFactory,
    UserSchemaFactory,
    ...AuthCommandHandlers,
    ...AuthQueryHandlers

  ]
})
export class AuthenticationModule {

  constructor(private readonly kafkaService: KafkaService, private readonly authService: AuthService) {}

  async onModuleInit() {
    await this.kafkaService.createConsumer('auth-group', KafkaTopics.KafkaAuthenticationRequestTopic, async (payload) => {
      const { value } = payload.message;
      const data = JSON.parse(value.toString());
      const {
        name,
        email,
        password
      } = data;
      const result = await this.authService.signup(
        name,
        email,
        password
      );

      // Send the response back
      await this.kafkaService.sendMessage('auth-responses', [result]);
    });
  }
}
