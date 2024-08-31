import { 
  handleError, 
  InventoryActionEnum
} from '@app/common';
import { INVENTORY_SERVICE_NAME, InventoryServiceClient, ProductListRequest } from '@app/common/types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiGatewayInventoryKafkaService } from '../../infrustructure/messaging/gateway-inventory-kafka.service';
import { CreateProductDto } from '@apps/inventory/application/dto/product/CreateProduct.dto';
import { UpdateProductDto } from '@apps/inventory/application/dto/product/Updateproduct.dto';



@Injectable()
export class InventoryService implements OnModuleInit {
  private inventoryService: InventoryServiceClient

  constructor(
    @Inject(INVENTORY_SERVICE_NAME) private client: ClientGrpc,
    private readonly kafkaService: ApiGatewayInventoryKafkaService
  ){}

  onModuleInit() {
    this.inventoryService = this.client.getService<InventoryServiceClient>(INVENTORY_SERVICE_NAME)
  }

  async find(filterQuery: ProductListRequest){
    return await handleError(this.inventoryService.findProductList(filterQuery))
  }

  async findOne(_id: string){
    return await handleError(this.inventoryService.findOneProduct({id: _id}))
  }

  async create(createProductDto: CreateProductDto, user: string) {
    const {success, data, message} = await this.kafkaService.sendRequestToInventoryService({
      ...createProductDto,
      user,
      action: InventoryActionEnum.CreateProduct
    });

    return {
      success,
      data,
      message
    }
  }


  async update(productId: string, updateTodoItemDto: UpdateProductDto, user: string) {
    const {success, data, message} = await this.kafkaService.sendRequestToInventoryService({
      ...updateTodoItemDto,
      productId,
      user,
      action: InventoryActionEnum.UpdateProduct
    });

    return {
      success,
      data,
      message
    }
    
  }

  async remove(productId: string, user: string) {
    const {success, data, message} = await this.kafkaService.sendRequestToInventoryService({
      productId,
      user,
      action: InventoryActionEnum.DeleteProduct
    });

    return {
      success,
      data,
      message
    }
  }
}
