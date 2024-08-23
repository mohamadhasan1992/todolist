import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseQueryEntityRepository } from "@app/common/database/query-entity.repository";
import { OrderSchema } from "../database/schemas/order.schema";
import { OrderSchemaFactory } from "../database/schema-factory/order-schema.factory";
import { Order } from "../../domain/entities/order.entity";



@Injectable()
export class OrderQueryEntityRepository extends BaseQueryEntityRepository<OrderSchema, Order>{
    constructor(
        @InjectModel("queryOrder", "query")
        orderModel: Model<OrderSchema>,
        orderSchemaFactory: OrderSchemaFactory
    ){
        super(orderModel, orderSchemaFactory);
    }
}