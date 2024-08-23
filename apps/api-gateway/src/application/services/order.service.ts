import { 
  handleError } from '@app/common';
import { ORDER_SERVICE_NAME, OrderListRequest, OrderServiceClient } from '@app/common/types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';




@Injectable()
export class OrderService implements OnModuleInit {
  private orderService: OrderServiceClient;

  constructor(
    @Inject(ORDER_SERVICE_NAME) private client: ClientGrpc 
  ){}

  onModuleInit() {
    this.orderService = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }


  async findAll(
    filterQuery: OrderListRequest
  ) {
    return await handleError(this.orderService.findOrderList(filterQuery));
  }

  async findOne(
    _id: string
  ) {
    return await handleError(this.orderService.findOneOrder({id: _id}));
  }

  // async create(createTodolistDto: CreateTodoListDto) {
  //   return await handleError(this.orderService.createTodoList(createTodolistDto));
  // }

  // async update(updateTodolistDto: UpdateTodoListDto) {
  //   return await handleError(this.orderService.updateTodoList(updateTodolistDto));
  // }

  // async remove(deleteTodoListDto: DeleteTodoItemDto) {
  //   return await handleError(this.orderService.deleteTodoList(deleteTodoListDto))
  // }
}
