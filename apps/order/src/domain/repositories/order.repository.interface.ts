import { FilterQuery } from "mongoose";
import { Order } from "../entities/order.entity";



export interface IOrderCommandRepository {
  create(order): Promise<Order>,
  save(order: Order): Promise<Order>;
  findOneByIdAndDelete(id: string, entity: Order): Promise<void>;
  findOneAndReplaceById(id: string, entity: Order): Promise<void>
}

export interface IOrderQueryRepository {
  findOneById(id: string): Promise<Order | null>;
  findAll(filterQuery: FilterQuery<Order>): Promise<Order[]>;
}