import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOnePaymentQuery } from './get-payment-query';
import { InjectModel } from '@nestjs/mongoose';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';






@QueryHandler(GetOnePaymentQuery)
export class GetOnePaymentHandler implements IQueryHandler<GetOnePaymentQuery> {
  constructor(
    @InjectModel("PaymentRepository")
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute({findPaymentById}: GetOnePaymentQuery) {
    const {id} = findPaymentById;
    return this.paymentRepository.findOne({id} as any);
  }
}
