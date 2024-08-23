import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { IAuthenticatedUser } from '@app/common';
import { JwtAuthGuard } from '../../infrustructure/auth/guards/jwt-auth.guard';
import { GatewayCreateTodoItemDto } from '../dto/gateway-create-todoItem.dto';
import { CurrentUser } from '../../infrustructure/auth/decorators/current-user.decorator';
import { GatewayUpdateTodoItemDto } from '../dto/gateway-update-todoItem.dto';
import { InventoryService } from '../../application/services/inventory.service';
import { OrderListRequest, PaymentListRequest } from '@app/common/types';
import { OrderService } from '../../application/services/order.service';
import { PaymentService } from '../../application/services/payment.service';



@Controller('order')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  @Get()
  async getProductList(
    @Query() paymentListRequest: PaymentListRequest
  ){
    return await this.paymentService.findAll(paymentListRequest)
  }

  @Get(":id")
  async getItemsByListId(
    @Param("id") orderListId: string,
  ){
    return await this.paymentService.findOne(orderListId)
  }

  // @Post()
  // async create(
  //   @Body() createTodoItemDto: GatewayCreateTodoItemDto,
  //   @CurrentUser() user: IAuthenticatedUser
  // ) {
  //   const {description, priority, title, todoList} = createTodoItemDto;
  //   return await this.paymentService.create({
  //     description, 
  //     priority, 
  //     title,
  //     todoList,
  //     user: user._id
  //   });
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string, 
  //   @Body() updateTodoItemDto: GatewayUpdateTodoItemDto,
  //   @CurrentUser() user: IAuthenticatedUser
  // ) {
  //   const {description, priority, title, todoList} = updateTodoItemDto;
  //   return await this.paymentService.update({
  //     description, 
  //     priority, 
  //     title, 
  //     todoList,
  //     id,
  //     user: user._id
  //   });
  // }

  // @Delete(':id')
  // async remove(
  //   @Param('id') id: string,
  //   @CurrentUser() user: IAuthenticatedUser
  
  // ) {
  //   return await this.paymentService.remove({
  //     id,
  //     user: user._id
  //   });
  // }
}
