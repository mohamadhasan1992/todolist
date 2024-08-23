import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductQuery } from './get-product-query';
import { IProductQueryRepository } from '@apps/inventory/domain/repositories/product.repository.interface';




@QueryHandler(GetProductQuery)
export class GetProductItemsHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    @Inject("ProductQueryRepository")
    private readonly productRepository: IProductQueryRepository
  ) {}

  async execute({findProductById}: GetProductQuery) {
    const {id} = findProductById;
    return this.productRepository.findOneById(id);
  }
}
