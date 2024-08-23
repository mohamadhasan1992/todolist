import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOneOrderQuery } from './get-order-query';
import { IOrderQueryRepository } from '../../domain/repositories/order.repository.interface';




@QueryHandler(GetOneOrderQuery)
export class GetOneOrderHandler implements IQueryHandler<GetOneOrderQuery> {
  constructor(
    @Inject("OrderQueryRepository")
    private readonly orderRepository: IOrderQueryRepository
  ) {}

  async execute({findOrderById}: GetOneOrderQuery) {
    const {id} = findOrderById;
    return this.orderRepository.findOneById(id);
  }
}
