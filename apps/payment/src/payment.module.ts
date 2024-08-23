import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { PaymentSchema } from './infrastructure/database/schemas/payment.schema';
import { PaymentController } from './presentation/controllers/payment.controller';
import { PaymentCommandEntityRepository } from './infrastructure/repositories/payment-command-entity.repository';
import { PaymentQueryEntityRepository } from './infrastructure/repositories/payment-query-entity.repository';
import { PaymentEntityFactory } from './domain/entityFactory/PaymentEntity.factory';
import { PaymentSchemaFactory } from './infrastructure/database/schema-factory/payment-schema.factory';
import { PaymentCommandHandlers } from './application/commands';
import { PaymentQueryHandlers } from './application/queries';
import { GetPaymentListHandler } from './application/queries/get-paymentList-query.handler';
import { PaymentEventHandlers } from './domain/events';





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
        name: "queryPayment", 
        schema: SchemaFactory.createForClass(PaymentSchema) 
      },
    ], 
    "query"
  ),
  DatabaseModule.forFeature([        
    { 
      name: "commandPayment", 
      schema: SchemaFactory.createForClass(PaymentSchema) 
    },
  ], 
  "command"
  ),
  ],
  controllers: [
    PaymentController
],
  providers: [
    { provide: 'PaymentCommandRepository', useClass: PaymentCommandEntityRepository },
    { provide: 'PaymentQueryRepository', useClass: PaymentQueryEntityRepository },
    PaymentEntityFactory,
    PaymentSchemaFactory,
    ...PaymentCommandHandlers,
    ...PaymentEventHandlers,
    ...PaymentQueryHandlers,
    GetPaymentListHandler,
  ],
})
export class PaymentModule {}