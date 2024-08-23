import { EntityFactory } from "@app/common/database/entity.factory";
import { Types } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { IOrderCommandRepository } from "../repositories/order.repository.interface";
import { OrderCreatedEvent } from "../events/order-created.event";



@Injectable()
export class OrderEntityFactory implements EntityFactory<Order>{
    constructor(
        @Inject("OrderCommandRepository") 
        private readonly orderRepository: IOrderCommandRepository
    ){}

    async create(quantity: number, user: string, description: string): Promise<Order> {
        const order = new Order(
            new Types.ObjectId().toHexString(), 
            quantity,
            user,
            description,
            new Date(Date.now())
        )
        await this.orderRepository.create(order)
        order.apply(
            new OrderCreatedEvent(order.getId())
        );
        return order
    }
}