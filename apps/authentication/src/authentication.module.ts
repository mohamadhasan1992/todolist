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
import { NatsJetStreamModule } from '@app/common/messaging/nats-jetstream.module';




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
    NatsJetStreamModule.register(["authentication"]),
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
export class AuthenticationModule {}
