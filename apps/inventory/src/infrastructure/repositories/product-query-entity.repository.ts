import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseQueryEntityRepository } from "@app/common/database/query-entity.repository";
import { Product } from "@apps/inventory/domain/entities/product.entity";
import { ProductSchema } from "../database/schemas/product.schema";
import { ProductSchemaFactory } from "../database/schema-factory/product-schema.factory";



@Injectable()
export class ProductQueryEntityRepository extends BaseQueryEntityRepository<ProductSchema, Product>{
    constructor(
        @InjectModel("queryProduct", "query")
        productModel: Model<ProductSchema>,
        productSchemaFactory: ProductSchemaFactory
    ){
        super(productModel, productSchemaFactory);
    }
}