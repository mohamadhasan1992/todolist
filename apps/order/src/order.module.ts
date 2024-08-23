import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { OrderSchema } from './infrastructure/database/schemas/order.schema';
import { OrderController } from './presentation/controllers/order.controller';
import { OrderCommandEntityRepository } from './infrastructure/repositories/order-command-entity.repository';
import { OrderQueryEntityRepository } from './infrastructure/repositories/order-query-entity.repository';
import { OrderEntityFactory } from './domain/entityFactory/OrderEntity.factory';
import { OrderSchemaFactory } from './infrastructure/database/schema-factory/order-schema.factory';
import { OrderCommandHandlers } from './application/commands';
import { OrderQueryHandlers } from './application/queries';
import { GetOrderListHandler } from './application/queries/get-orderList-query.handler';
import { OrderEventHandlers } from './domain/events';





@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_QUERY_URI: Joi.string().required(),
        MONGO_COMMAND_URI: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
      })
    }),
    CqrsModule,
    DatabaseModule.forRootAsync('command', {
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_QUERY_URI'),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule.forRootAsync('query', {
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_COMMAND_URI'),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule.forFeature([       
      { 
        name: "queryOrder", 
        schema: SchemaFactory.createForClass(OrderSchema) 
      },
    ], 
    "query"
  ),
  DatabaseModule.forFeature([        
    { 
      name: "commandOrder", 
      schema: SchemaFactory.createForClass(OrderSchema) 
    },
  ], 
  "command"
  ),
  ],
  controllers: [
    OrderController
],
  providers: [
    { provide: 'OrderCommandRepository', useClass: OrderCommandEntityRepository },
    { provide: 'OrderQueryRepository', useClass: OrderQueryEntityRepository },
    OrderEntityFactory,
    OrderSchemaFactory,
    ...OrderCommandHandlers,
    ...OrderEventHandlers,
    ...OrderQueryHandlers,
    GetOrderListHandler,
  ],
})
export class OrderModule {}