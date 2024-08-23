import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RedisOptions } from '@app/common/config/redisOptions';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { LoggerMiddleware } from './infrustructure/middlewares/logger.middleware';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { UserJwtStrategy } from './infrustructure/auth/strategies/jwt.strategy';
import { RpcExceptionFilter } from './domain/exceptions/rpc-exception.filter';
import { HealthController } from './presentation/controllers/health.controller';
import * as Joi from 'joi';
import { AUTH_SERVICE_NAME, INVENTORY_SERVICE_NAME, ORDER_SERVICE_NAME, PAYMENT_SERVICE_NAME, QUERY_PACKAGE_NAME } from '@app/common/types';
import { InventoryService } from './application/services/inventory.service';
import { PaymentService } from './application/services/payment.service';
import { OrderService } from './application/services/order.service';
import { InventoryController } from './presentation/controllers/inventory.controller';
import { PaymentController } from './presentation/controllers/payment.controller';
import { OrderController } from './presentation/controllers/order.controller';




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
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url:"authentication:50051",
          package: QUERY_PACKAGE_NAME,
          protoPath: join(__dirname, '../query.proto'),
        },
      } 
    ]),
    ClientsModule.register([
      {
        name: INVENTORY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url:"Inventory:50052",
          package: QUERY_PACKAGE_NAME,
          protoPath: join(__dirname, '../query.proto'),
        },
      } 
    ]),

    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url:"Order:50053",
          package: QUERY_PACKAGE_NAME,
          protoPath: join(__dirname, '../query.proto'),
        },
      } 
    ]),
    ClientsModule.register([
      {
        name: PAYMENT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url:"Payment:50054",
          package: QUERY_PACKAGE_NAME,
          protoPath: join(__dirname, '../query.proto'),
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
    InventoryController,
    PaymentController,
    OrderController,
    HealthController
  ],
  providers: [
    InventoryService,
    PaymentService,
    OrderService,
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
