import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseCommandEntityRepository } from "@app/common/database/command-entity.repository";
import { OrderSchema } from "../database/schemas/order.schema";
import { Order } from "../../domain/entities/order.entity";
import { OrderSchemaFactory } from "../database/schema-factory/order-schema.factory";







@Injectable()
export class OrderCommandEntityRepository extends BaseCommandEntityRepository<OrderSchema, Order>{
    constructor(
        @InjectModel("commandOrder", "command")
        orderModel: Model<OrderSchema>,
        orderSchemaFactory: OrderSchemaFactory
    ){
        super(orderModel, orderSchemaFactory);
    }
}