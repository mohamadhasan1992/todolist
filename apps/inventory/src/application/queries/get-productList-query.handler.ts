import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductListsQuery } from './get-productList-query';
import { IProductQueryRepository } from '@apps/inventory/domain/repositories/product.repository.interface';





@QueryHandler(GetProductListsQuery)
export class GetProductListHandler implements IQueryHandler<GetProductListsQuery> {
  constructor(
    @Inject("ProductQueryRepository")
    private readonly productRepository: IProductQueryRepository
  ) {}

  async execute({productListRequest}: GetProductListsQuery) {
    const {
      labelFilter,
      minPrice,
      maxPrice,
      page,
      limit,
      sort
    } = productListRequest;
    return this.productRepository.findAll({
      label: labelFilter,
      price: {gte: minPrice, lte: maxPrice},
      page, 
      limit,
      sort
    });
  }
}
