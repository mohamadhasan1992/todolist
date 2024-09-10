import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PaymentController } from './presentation/controllers/payment.controller';
import { PaymentEntityFactory } from './domain/entityFactory/PaymentEntity.factory';
import { PaymentCommandHandlers } from './application/commands';
import { PaymentQueryHandlers } from './application/queries';
import { GetPaymentListHandler } from './application/queries/get-paymentList-query.handler';
import { PaymentEventHandlers } from './domain/events';
import { PaymentEntity } from './infrastructure/database/schemas/payment.schema';
import { PaymentEntityRepository } from './infrastructure/repositories/payment-entity.repository';
import { PostgresDatabaseModule } from '@app/common/postgresdatabase/postgres-database.module';
import { PaymentSchemaFactory } from './infrastructure/database/schema-factory/payment-schema.factory';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_MASTER_HOST: Joi.string().required(),
        DB_MASTER_PORT: Joi.number().required(),
        DB_MASTER_USER: Joi.string().required(),
        DB_MASTER_PASSWORD: Joi.string().required(),
        DB_MASTER_NAME: Joi.string().required(),
        DB_SLAVE1_HOST: Joi.string().required(),
        DB_SLAVE1_PORT: Joi.number().required(),
        DB_SLAVE1_USER: Joi.string().required(),
        DB_SLAVE1_PASSWORD: Joi.string().required(),
        DB_SLAVE1_NAME: Joi.string().required(),
        DB_SLAVE2_HOST: Joi.string().required(),
        DB_SLAVE2_PORT: Joi.number().required(),
        DB_SLAVE2_USER: Joi.string().required(),
        DB_SLAVE2_PASSWORD: Joi.string().required(),
        DB_SLAVE2_NAME: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
      })
    }),
    CqrsModule,
    PostgresDatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        master: {
          host: configService.get<string>('DB_MASTER_HOST'),
          port: configService.get<number>('DB_MASTER_PORT'),
          username: configService.get<string>('DB_MASTER_USER'),
          password: configService.get<string>('DB_MASTER_PASSWORD'),
          database: configService.get<string>('DB_MASTER_NAME'),
        },
        slaves: [
          {
            name: configService.get<string>('DB_SLAVE1_NAME'),
            host: configService.get<string>('DB_SLAVE1_HOST'),
            port: configService.get<number>('DB_SLAVE1_PORT'),
            username: configService.get<string>('DB_SLAVE1_USER'),
            password: configService.get<string>('DB_SLAVE1_PASSWORD'),
            database: configService.get<string>('DB_SLAVE1_NAME'),
          },
          {
            name: configService.get<string>('DB_SLAVE2_NAME'),
            host: configService.get<string>('DB_SLAVE2_HOST'),
            port: configService.get<number>('DB_SLAVE2_PORT'),
            username: configService.get<string>('DB_SLAVE2_USER'),
            password: configService.get<string>('DB_SLAVE2_PASSWORD'),
            database: configService.get<string>('DB_SLAVE2_NAME'),
          },
        ],
      }),
    }),
    PostgresDatabaseModule.forFeature([PaymentEntity])
  ],
  controllers: [
    PaymentController
],
  providers: [
    {provide: "PaymentRepository", useClass: PaymentEntityRepository},
    PaymentSchemaFactory,
    PaymentEntityFactory,
    ...PaymentCommandHandlers,
    ...PaymentEventHandlers,
    ...PaymentQueryHandlers,
    GetPaymentListHandler,
  ],
})
export class PaymentModule {}