import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../infrustructure/auth/guards/jwt-auth.guard';
import { InventoryService } from '../../application/services/inventory.service';
import { ProductListRequest } from '@app/common/types';



@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}


  @Get()
  async getProductList(
    @Query() productListRequest: ProductListRequest
  ){
    return await this.inventoryService.find(productListRequest)
  }

  @Get(":id")
  async getItemsByListId(
    @Param("id") todoListId: string,
  ){
    return await this.inventoryService.findOne(todoListId)
  }

  // @Post()
  // async create(
  //   @Body() createTodoItemDto: GatewayCreateTodoItemDto,
  //   @CurrentUser() user: IAuthenticatedUser
  // ) {
  //   const {description, priority, title, todoList} = createTodoItemDto;
  //   return await this.inventoryService.create({
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
  //   return await this.inventoryService.update({
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
  //   return await this.inventoryService.remove({
  //     id,
  //     user: user._id
  //   });
  // }
}
