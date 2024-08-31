import { Controller, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { FindOneProductByIdQuery, InventoryServiceController, InventoryServiceControllerMethods, ProductItem, ProductList, ProductListRequest } from '@app/common';
import { GetProductQuery } from '@apps/inventory/application/queries/get-product-query';
import { GetProductListsQuery } from '@apps/inventory/application/queries/get-productList-query';





@Controller()
@InventoryServiceControllerMethods()
export class ProductController implements InventoryServiceController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  async findProductList(
    @Query() filterQuery: ProductListRequest
  ): Promise<ProductList>{
    const productLists = await this.queryBus.execute(
      new GetProductListsQuery(filterQuery)
    )
    return {
      productItems: productLists 
    }
  }

  async findOneProduct(
    @Payload() findOneProductDto: FindOneProductByIdQuery
  ): Promise<ProductItem>{
    const { id } = findOneProductDto;
    const todolist = await this.queryBus.execute(
      new GetProductQuery({id})
    )
    return todolist;
  }

}