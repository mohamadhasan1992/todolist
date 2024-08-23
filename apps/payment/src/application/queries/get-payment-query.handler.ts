import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOnePaymentQuery } from './get-payment-query';
import { IPaymentQueryRepository } from '../../domain/repositories/payment.repository.interface';






@QueryHandler(GetOnePaymentQuery)
export class GetOnePaymentHandler implements IQueryHandler<GetOnePaymentQuery> {
  constructor(
    @Inject("PaymentQueryRepository")
    private readonly paymentRepository: IPaymentQueryRepository
  ) {}

  async execute({findPaymentById}: GetOnePaymentQuery) {
    const {id} = findPaymentById;
    return this.paymentRepository.findOneById(id);
  }
}
