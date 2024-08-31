import { Controller, Get, Param, UseGuards, Query, Post, Body, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../../infrustructure/auth/guards/jwt-auth.guard';
import { InventoryService } from '../../application/services/inventory.service';
import { ProductListRequest } from '@app/common/types';
import { CurrentUser } from '../../infrustructure/auth/decorators/current-user.decorator';
import { IAuthenticatedUser } from '@app/common';
import { CreateProductDto } from '@apps/inventory/application/dto/product/CreateProduct.dto';
import { UpdateProductDto } from '@apps/inventory/application/dto/product/Updateproduct.dto';



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

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    return await this.inventoryService.create(createProductDto, user._id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    return await this.inventoryService.update(id, updateProductDto, user._id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthenticatedUser
  
  ) {
    return await this.inventoryService.remove(id, user._id);
  }
}
