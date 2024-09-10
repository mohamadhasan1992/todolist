import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOnePaymentQuery } from './get-payment-query';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { Inject } from '@nestjs/common';






@QueryHandler(GetOnePaymentQuery)
export class GetOnePaymentHandler implements IQueryHandler<GetOnePaymentQuery> {
  constructor(
    @Inject("PaymentRepository")
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute({findPaymentById}: GetOnePaymentQuery) {
    const {id} = findPaymentById;
    return this.paymentRepository.findOne({id} as any);
  }
}
