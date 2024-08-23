import { Controller, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { FindOneQuery, InventoryServiceController, InventoryServiceControllerMethods, ProductItem, ProductList, ProductListRequest } from '@app/common';
import { GetProductQuery } from '@apps/inventory/application/queries/get-product-query';
import { GetProductListsQuery } from '@apps/inventory/application/queries/get-productList-query';





@Controller()
@InventoryServiceControllerMethods()
export class ProductController implements InventoryServiceController {
  constructor(
    private readonly commandBus: CommandBus,
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
    @Payload() findOneProductDto: FindOneQuery
  ): Promise<ProductItem>{
    const { id } = findOneProductDto;
    const todolist = await this.queryBus.execute(
      new GetProductQuery({id})
    )
    return todolist;
  }

  // async createTodoList(
  //   @Payload() createTodoListDto: CreateTodoListDto,
  // ): Promise<CommandTodoListResponse> {
  //   const newTodoList = await this.commandBus.execute(new CreateTodoListCommand(createTodoListDto));
  //   return {
  //     ...newTodoList,
  //     message: "TodoList updated successfully!"
  //   }
  // }


  // async updateTodoList(
  //   @Payload() updateTodoListDto: UpdateTodoListDto,
  // ): Promise<CommandTodoListResponse> {
  //   const updatedTodoList = await this.commandBus.execute(new UpdateTodoListCommand(updateTodoListDto));
  //   return {
  //     ...updatedTodoList,
  //     message: "TodoList updated successfully!"
  //   }
  // }


  // async deleteTodoList(
  //   @Payload() deleteTodoListDto: DeleteTodoListDto,
  // ): Promise<CommandTodoListResponse> {

  //   const todoList = await this.commandBus.execute(new DeleteTodoListCommand(deleteTodoListDto));
  //   return {
  //     message: "todoList deleted successfully!",
  //     ...todoList
  //   }
  // }

}