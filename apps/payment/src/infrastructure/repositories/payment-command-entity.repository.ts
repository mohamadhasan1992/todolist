import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseCommandEntityRepository } from "@app/common/database/command-entity.repository";
import { PaymentSchema } from "../database/schemas/payment.schema";
import { Payment } from "../../domain/entities/payment.entity";
import { PaymentSchemaFactory } from "../database/schema-factory/payment-schema.factory";







@Injectable()
export class PaymentCommandEntityRepository extends BaseCommandEntityRepository<PaymentSchema, Payment>{
    constructor(
        @InjectModel("commandPayment", "command")
        paymentModel: Model<PaymentSchema>,
        paymentSchemaFactory: PaymentSchemaFactory
    ){
        super(paymentModel, paymentSchemaFactory);
    }
}