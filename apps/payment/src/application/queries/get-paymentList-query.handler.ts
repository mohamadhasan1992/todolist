import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaymentListsQuery } from './get-paymentList-query';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { Between, FindOptionsWhere } from 'typeorm';
import { Payment } from '../../domain/entities/payment.entity';
import { Inject } from '@nestjs/common';






@QueryHandler(GetPaymentListsQuery)
export class GetPaymentListHandler implements IQueryHandler<GetPaymentListsQuery> {
  constructor(
    @Inject("PaymentRepository")
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
