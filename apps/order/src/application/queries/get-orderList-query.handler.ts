import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOrderListsQuery } from './get-orderList-query';
import { IOrderQueryRepository } from '../../domain/repositories/order.repository.interface';





@QueryHandler(GetOrderListsQuery)
export class GetOrderListHandler implements IQueryHandler<GetOrderListsQuery> {
  constructor(
    @Inject("OrderQueryRepository")
    private readonly orderRepository: IOrderQueryRepository
  ) {}

  async execute({orderListRequest}: GetOrderListsQuery) {
    const {
      titleFilter,
      dateRangeStart,
      dateRangeEnd,
      page,
      limit,
      sort
    } = orderListRequest;
    return this.orderRepository.findAll({
      title: titleFilter,
      createdAt: {gte: dateRangeStart, lte: dateRangeEnd},
      page, 
      limit,
      sort
    });
  }
}
