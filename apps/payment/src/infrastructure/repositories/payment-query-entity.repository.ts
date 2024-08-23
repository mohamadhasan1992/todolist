import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseQueryEntityRepository } from "@app/common/database/query-entity.repository";
import { PaymentSchema } from "../database/schemas/payment.schema";
import { Payment } from "../../domain/entities/payment.entity";
import { PaymentSchemaFactory } from "../database/schema-factory/payment-schema.factory";



@Injectable()
export class PaymentQueryEntityRepository extends BaseQueryEntityRepository<PaymentSchema, Payment>{
    constructor(
        @InjectModel("queryPayment", "query")
        paymentModel: Model<PaymentSchema>,
        paymentSchemaFactory: PaymentSchemaFactory
    ){
        super(paymentModel, paymentSchemaFactory);
    }
}