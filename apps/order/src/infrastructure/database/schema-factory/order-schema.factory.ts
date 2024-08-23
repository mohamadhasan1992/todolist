import { EntitySchemaFactory } from "@app/common/database/entity-schema.factory";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { OrderSchema } from "../schemas/order.schema";
import { Order } from "apps/order/src/domain/entities/order.entity";



@Injectable()
export class OrderSchemaFactory implements EntitySchemaFactory<OrderSchema, Order>{
    create(order: Order): OrderSchema {
        return{
            _id: new Types.ObjectId(order.getId()),
            quantity: order.getQuantity(),
            user: order.getUser(),
            description: order.getDescription(),
            createdAt: order.setCreatedAt()
        }
    }
    createFromSchema(OrderSchema: OrderSchema): Order {
        return new Order(
            OrderSchema._id.toHexString(),
            OrderSchema.quantity,
            OrderSchema.user,
            OrderSchema.description,
            OrderSchema.createdAt
        )
    }
}