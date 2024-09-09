import { Injectable } from '@nestjs/common';
import { Payment } from 'apps/payment/src/domain/entities/payment.entity';
import { PaymentEntity } from '../schemas/payment.schema';
import { PostgresEntitySchemaFactory } from '@app/common/postgresdatabase/postgres-entity-schema.factory';


@Injectable()
export class PaymentSchemaFactory implements PostgresEntitySchemaFactory<PaymentEntity, Payment> {
  // Create a TypeORM entity from the domain entity
  create(payment: Payment): PaymentEntity {
    const paymentEntity = new PaymentEntity();
    paymentEntity.id = payment.getId();
    paymentEntity.user = payment.getUser();
    paymentEntity.quantity = payment.getQuantity();
    paymentEntity.createdAt = payment.getCreatedAt() || new Date(); 

    return paymentEntity;
  }

  // Create a domain entity from the TypeORM entity
  createFromEntity(paymentEntity: PaymentEntity): Payment {
    return new Payment(
      paymentEntity.id,
      paymentEntity.user,
      paymentEntity.quantity,
      paymentEntity.createdAt,
    );
  }
}
