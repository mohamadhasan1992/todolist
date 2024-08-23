import { CreateOrderDto } from "../../dto/product/CreateOrder.dto";



export class CreateOrderCommand {
    constructor(
      public readonly createOrderDto: CreateOrderDto
    ) {}
}
  
