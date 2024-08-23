import { DeleteOrderDto } from "../../dto/product/DeleteOrder.dto";



export class DeleteOrderCommand{
    constructor(
        public readonly deleteOrderDto: DeleteOrderDto,
    ){}
}