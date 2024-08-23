import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPaymentListsQuery } from './get-paymentList-query';
import { IPaymentQueryRepository } from '../../domain/repositories/payment.repository.interface';






@QueryHandler(GetPaymentListsQuery)
export class GetPaymentListHandler implements IQueryHandler<GetPaymentListsQuery> {
  constructor(
    @Inject("PaymentQueryRepository")
    private readonly paymentRepository: IPaymentQueryRepository
  ) {}

  async execute({paymentListRequest}: GetPaymentListsQuery) {
    const {
      minQuantity,
      maxQuantity,
      page,
      limit,
      sort
    } = paymentListRequest;
    return this.paymentRepository.findAll({
      quantity: {gte: minQuantity, lte: maxQuantity},
      page, 
      limit,
      sort
    });
  }
}
