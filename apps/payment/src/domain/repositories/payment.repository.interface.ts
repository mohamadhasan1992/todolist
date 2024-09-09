import { FindOneOptions, FindOptionsWhere } from "typeorm";
import { Payment } from "../entities/payment.entity";



export interface IPaymentRepository {
  find(dilterQuery?: FindOptionsWhere<Payment>): Promise<Payment[]>;
  findOne(filterQuery: FindOneOptions<Payment>): Promise<Payment>;
  create(entity: Payment): Promise<Payment>;
  update(id: string, entity: Payment): Promise<Payment>;
  delete(id: string): Promise<void>;
}
