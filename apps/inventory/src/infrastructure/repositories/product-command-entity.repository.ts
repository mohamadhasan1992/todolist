import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseCommandEntityRepository } from "@app/common/database/command-entity.repository";
import { ProductSchema } from "../database/schemas/product.schema";
import { Product } from "@apps/inventory/domain/entities/product.entity";
import { ProductSchemaFactory } from "../database/schema-factory/product-schema.factory";



@Injectable()
export class ProductCommandEntityRepository extends BaseCommandEntityRepository<ProductSchema, Product>{
    constructor(
        @InjectModel("commandProduct", "command")
        productModel: Model<ProductSchema>,
        productSchemaFactory: ProductSchemaFactory
    ){
        super(productModel, productSchemaFactory);
    }
}