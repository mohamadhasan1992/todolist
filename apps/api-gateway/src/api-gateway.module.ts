import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RedisOptions } from '@app/common/config/redisOptions';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { LoggerMiddleware } from './infrustructure/middlewares/logger.middleware';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE, TODO_PACKAGE_NAME, TODO_SERVICE } from '@app/common';
import { join } from 'path';
import { TodoItemController } from './presentation/controllers/todo-item.controller';
import { TodoItemService } from './application/services/todo-item.service';
import { TodolistController } from './presentation/controllers/todolist.controller';
import { TodolistService } from './application/services/todolist.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { UserJwtStrategy } from './infrustructure/auth/strategies/jwt.strategy';
import { RpcExceptionFilter } from './domain/exceptions/rpc-exception.filter';
import { HealthController } from './presentation/controllers/health.controller';
import * as Joi from 'joi';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDISE_PORT: Joi.number().required(),
      })
    }),
    ClientsModule.register([
      {
        name: TODO_SERVICE,
        transport: Transport.GRPC,
        options: {
          url:"Todo:50052",
          package: TODO_PACKAGE_NAME,
          protoPath: join(__dirname, '../todo.proto'),
        },
      } 
    ]),
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          url:"authentication:50051",
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto'),
        },
      } 
    ]),
    JwtModule.registerAsync({
      useFactory: async(configService: ConfigService) => ({
        import: [ConfigModule],
        secret: configService.getOrThrow<string>("JWT_SECRET"),
        signOptions: { expiresIn:  configService.getOrThrow<string>("JWT_EXPIRES_IN")}
      }),
      inject: [ConfigService]
    }),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [
    AuthController,
    TodolistController,
    TodoItemController,
    HealthController
  ],
  providers: [
    TodolistService,
    TodoItemService,
    AuthService, 
    UserJwtStrategy,
    {
      provide: APP_FILTER,
      useClass: RpcExceptionFilter,
    },
  ],
})
export class ApiGatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
