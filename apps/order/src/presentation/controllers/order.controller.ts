import { Controller, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { FindOneQuery, OrderItem, OrderListRequest, OrderLists, OrderServiceController, OrderServiceControllerMethods, ProductItem, ProductList, ProductListRequest } from '@app/common';
import { GetProductQuery } from '@apps/inventory/application/queries/get-product-query';
import { GetProductListsQuery } from '@apps/inventory/application/queries/get-productList-query';
import { GetOrderListsQuery } from '../../application/queries/get-orderList-query';
import { GetOneOrderQuery } from '../../application/queries/get-order-query';





@Controller()
@OrderServiceControllerMethods()
export class OrderController implements OrderServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async findOrderList(
    @Query() filterQuery: OrderListRequest
  ): Promise<OrderLists>{
    const orderLists = await this.queryBus.execute(
      new GetOrderListsQuery(filterQuery)
    )
    return {
      orderItems: orderLists 
    }
  }

  async findOneOrder(
    @Payload() findOneOrderDto: FindOneQuery
  ): Promise<OrderItem>{
    const { id } = findOneOrderDto;
    const orderItem = await this.queryBus.execute(
      new GetOneOrderQuery({id})
    )
    return orderItem;
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