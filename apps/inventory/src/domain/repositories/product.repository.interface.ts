import { FilterQuery } from "mongoose";
import { Product } from "../entities/product.entity";



export interface IProductCommandRepository {
  create(TodoList): Promise<Product>,
  save(todo: Product): Promise<Product>;
  findOneByIdAndDelete(id: string, entity: Product): Promise<void>;
  findOneAndReplaceById(id: string, entity: Product): Promise<void>
}

export interface IProductQueryRepository {
  findOneById(id: string): Promise<Product | null>;
  findAll(filterQuery: FilterQuery<Product>): Promise<Product[]>;
}