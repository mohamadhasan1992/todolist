import { UpdateOrderDto } from "../../dto/product/UpdateOrder.dto";


export class UpdateOrderCommand{
    constructor(
        public readonly updateOrderDto: UpdateOrderDto,
        public readonly id: string
    ){}
}