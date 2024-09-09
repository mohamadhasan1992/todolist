import { EntityFactory } from "@app/common/database/entity.factory";
import { Injectable } from "@nestjs/common";
import { Payment } from "../entities/payment.entity";
import { PaymentCreatedEvent } from "../events/payment-created.event";
import { v4 as uuidv4 } from 'uuid';
import { IPaymentRepository } from "../repositories/payment.repository.interface";
import { InjectModel } from "@nestjs/mongoose";





@Injectable()
export class PaymentEntityFactory implements EntityFactory<Payment>{
    constructor(
        @InjectModel("PaymentRepository")
        private readonly paymentRepository: IPaymentRepository,
    ){}

    async create(quantity: number, user: string): Promise<Payment> {
        const payment = new Payment(
            uuidv4, 
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