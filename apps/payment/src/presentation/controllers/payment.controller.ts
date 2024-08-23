import { Controller, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { FindOneQuery, PaymentItem, PaymentList, PaymentListRequest, PaymentServiceController, PaymentServiceControllerMethods, ProductItem, ProductList, ProductListRequest } from '@app/common';
import { GetPaymentListsQuery } from '../../application/queries/get-paymentList-query';
import { GetOnePaymentQuery } from '../../application/queries/get-payment-query';





@Controller()
@PaymentServiceControllerMethods()
export class PaymentController implements PaymentServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async findPayment(
    @Query() filterQuery: PaymentListRequest
  ): Promise<PaymentList>{
    const paymentLists = await this.queryBus.execute(
      new GetPaymentListsQuery(filterQuery)
    )
    return {
      paymentItems: paymentLists 
    }
  }

  async findOnePayment(
    @Payload() findOnePaymentDto: FindOneQuery
  ): Promise<PaymentItem>{
    const { id } = findOnePaymentDto;
    const paymentItem = await this.queryBus.execute(
      new GetOnePaymentQuery({id})
    )
    return paymentItem;
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