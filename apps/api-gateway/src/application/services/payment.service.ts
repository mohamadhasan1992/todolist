import { 
  handleError
} from '@app/common';
import { ORDER_SERVICE_NAME, PAYMENT_SERVICE_NAME, PaymentListRequest, PaymentServiceClient } from '@app/common/types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';




@Injectable()
export class PaymentService implements OnModuleInit {
  private paymentService: PaymentServiceClient;

  constructor(
    @Inject(ORDER_SERVICE_NAME) private client: ClientGrpc 
  ){}

  onModuleInit() {
    this.paymentService = this.client.getService<PaymentServiceClient>(PAYMENT_SERVICE_NAME);
  }

  async findAll(
    filterQuery: PaymentListRequest
  ) {
    return await handleError(this.paymentService.findPayment(filterQuery));
  }

  async findOne(
    _id: string
  ){
    return await handleError(this.paymentService.findOnePayment({id: _id}))
  } 


  // async create(createTodolistDto: CreateTodoListDto) {
  //   return await handleError(this.paymentService.createTodoList(createTodolistDto));
  // }


  // async update(updateTodolistDto: UpdateTodoListDto) {
  //   return await handleError(this.paymentService.updateTodoList(updateTodolistDto));
  // }

  // async remove(deleteTodoListDto: DeleteTodoItemDto) {
  //   return await handleError(this.paymentService.deleteTodoList(deleteTodoListDto))
  // }
}
