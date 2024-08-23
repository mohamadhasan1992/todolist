import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { IAuthenticatedUser } from '@app/common';
import { JwtAuthGuard } from '../../infrustructure/auth/guards/jwt-auth.guard';
import { GatewayCreateTodoItemDto } from '../dto/gateway-create-todoItem.dto';
import { CurrentUser } from '../../infrustructure/auth/decorators/current-user.decorator';
import { GatewayUpdateTodoItemDto } from '../dto/gateway-update-todoItem.dto';
import { InventoryService } from '../../application/services/inventory.service';
import { OrderListRequest } from '@app/common/types';
import { OrderService } from '../../application/services/order.service';



@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Get()
  async getProductList(
    @Query() orderListRequest: OrderListRequest
  ){
    return await this.orderService.findAll(orderListRequest)
  }

  @Get(":id")
  async getItemsByListId(
    @Param("id") orderListId: string,
  ){
    return await this.orderService.findOne(orderListId)
  }

  // @Post()
  // async create(
  //   @Body() createTodoItemDto: GatewayCreateTodoItemDto,
  //   @CurrentUser() user: IAuthenticatedUser
  // ) {
  //   const {description, priority, title, todoList} = createTodoItemDto;
  //   return await this.orderService.create({
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
  //   return await this.orderService.update({
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
  //   return await this.orderService.remove({
  //     id,
  //     user: user._id
  //   });
  // }
}
