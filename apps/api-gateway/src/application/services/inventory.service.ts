import { 
  handleError 
} from '@app/common';
import { INVENTORY_SERVICE_NAME, InventoryServiceClient, ProductListRequest } from '@app/common/types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';



@Injectable()
export class InventoryService implements OnModuleInit {
  private inventoryService: InventoryServiceClient

  constructor(
    @Inject(INVENTORY_SERVICE_NAME) private client: ClientGrpc 
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

  // async create(createTodoItemDto: CreateTodoItemDto) {
  //   return await handleError(this.inventoryService.createTodoItem(createTodoItemDto));
  // }


  // async update(updateTodoItemDto: UpdateTodoItemDto) {
  //   return await handleError(this.inventoryService.updateTodoItem(updateTodoItemDto));
  // }

  // async remove(deleteTodoItemDto: DeleteTodoItemDto) {
  //   return await handleError(this.inventoryService.deleteTodoItem(deleteTodoItemDto));
  // }
}
