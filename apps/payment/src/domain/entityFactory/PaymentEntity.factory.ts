import { EntityFactory } from "@app/common/database/entity.factory";
import { Types } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { Payment } from "../entities/payment.entity";
import { IPaymentCommandRepository } from "../repositories/payment.repository.interface";
import { PaymentCreatedEvent } from "../events/payment-created.event";






@Injectable()
export class PaymentEntityFactory implements EntityFactory<Payment>{
    constructor(
        @Inject("PaymentCommandRepository") 
        private readonly paymentRepository: IPaymentCommandRepository
    ){}

    async create(quantity: number, user: string): Promise<Payment> {
        const payment = new Payment(
            new Types.ObjectId().toHexString(), 
            user,
            quantity,
            new Date(Date.now())
        )
        await this.paymentRepository.create(payment)
        payment.apply(
            new PaymentCreatedEvent(payment.getId())
        );
        return payment
    }
}