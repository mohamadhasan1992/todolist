import { EntityFactory } from "@app/common/database/entity.factory";
import { Types } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { IProductCommandRepository } from "../repositories/product.repository.interface";
import { ProductCreatedEvent } from "../events/product-created.event";



@Injectable()
export class ProductEntityFactory implements EntityFactory<Product>{
    constructor(
        @Inject("ProductCommandRepository") 
        private readonly productRepository: IProductCommandRepository
    ){}

    async create(label: string, user: string, price: number, quantity: number): Promise<Product> {
        const product = new Product(
            new Types.ObjectId().toHexString(), 
            label,
            user,
            price,
            quantity
        )
        await this.productRepository.create(product)
        Product.apply(
            new ProductCreatedEvent(product.getId())
        );
        return product
    }
}