import { FilterQuery } from "mongoose";
import { Payment } from "../entities/payment.entity";



export interface IPaymentCommandRepository {
  create(payment): Promise<Payment>,
  save(payment: Payment): Promise<Payment>;
  findOneByIdAndDelete(id: string, entity: Payment): Promise<void>;
  findOneAndReplaceById(id: string, entity: Payment): Promise<void>
}

export interface IPaymentQueryRepository {
  findOneById(id: string): Promise<Payment | null>;
  findAll(filterQuery: FilterQuery<Payment>): Promise<Payment[]>;
}