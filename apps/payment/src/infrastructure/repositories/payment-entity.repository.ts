import { Injectable } from "@nestjs/common";
import { Payment } from "../../domain/entities/payment.entity";
import { PaymentEntity } from "../database/schemas/payment.schema";
import { PostgresBaseRepository } from "@app/common/postgresdatabase/postgres-base-entity.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaymentSchemaFactory } from "../database/schema-factory/payment-schema.factory";



@Injectable()
export class PaymentEntityRepository extends PostgresBaseRepository<PaymentEntity, Payment>{
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
        paymentSchemaFactory: PaymentSchemaFactory
    ){
        super(paymentRepository, paymentSchemaFactory);
    }
}