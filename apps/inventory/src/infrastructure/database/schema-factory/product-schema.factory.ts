import { EntitySchemaFactory } from "@app/common/database/entity-schema.factory";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { ProductSchema } from "../schemas/product.schema";
import { Product } from "@apps/inventory/domain/entities/product.entity";



@Injectable()
export class ProductSchemaFactory implements EntitySchemaFactory<ProductSchema, Product>{
    create(product: Product): ProductSchema {
        return{
            _id: new Types.ObjectId(product.getId()),
            label: product.getLabel(),
            user: product.getUser(),
            price: product.getPrice(),
            quantity: product.getQuantity()
        }
    }
    createFromSchema(productSchema: ProductSchema): Product {
        return new Product(
            productSchema._id.toHexString(),
            productSchema.label,
            productSchema.user,
            productSchema.price,
            productSchema.quantity
        )
    }
}