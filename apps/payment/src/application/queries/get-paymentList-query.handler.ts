import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaymentListsQuery } from './get-paymentList-query';
import { InjectModel } from '@nestjs/mongoose';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { Between, FindOptionsWhere } from 'typeorm';
import { Payment } from '../../domain/entities/payment.entity';






@QueryHandler(GetPaymentListsQuery)
export class GetPaymentListHandler implements IQueryHandler<GetPaymentListsQuery> {
  constructor(
    @InjectModel("PaymentRepository")
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute({paymentListRequest}: GetPaymentListsQuery) {
    const {
      minQuantity,
      maxQuantity,
      page,
      limit,
      sort
    } = paymentListRequest;
    return this.paymentRepository.find({
      quantity: Between(minQuantity, maxQuantity),
      page, 
      limit,
      sort
    } as unknown as FindOptionsWhere<Payment>);
  }
}
