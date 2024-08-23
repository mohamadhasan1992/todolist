import { EntitySchemaFactory } from "@app/common/database/entity-schema.factory";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { PaymentSchema } from "../schemas/payment.schema";
import { Payment } from "apps/payment/src/domain/entities/payment.entity";



@Injectable()
export class PaymentSchemaFactory implements EntitySchemaFactory<PaymentSchema, Payment>{
    create(payment: Payment): PaymentSchema {
        return{
            _id: new Types.ObjectId(payment.getId()),
            quantity: payment.getQuantity(),
            user: payment.getUser(),
            createdAt: payment.setCreatedAt()
        }
    }
    createFromSchema(paymentSchema: PaymentSchema): Payment {
        return new Payment(
            paymentSchema._id.toHexString(),
            paymentSchema.user,
            paymentSchema.quantity,
            paymentSchema.createdAt
        )
    }
}