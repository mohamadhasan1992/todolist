import { DeleteProductDto } from "../../dto/product/DeleteProduct.dto";


export class DeleteProductCommand{
    constructor(
        public readonly deleteProductDto: DeleteProductDto,
    ){}
}