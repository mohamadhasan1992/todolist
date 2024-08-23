import { UpdateProductDto } from "../../dto/product/Updateproduct.dto";


export class UpdateProductCommand{
    constructor(
        public readonly updateProductDto: UpdateProductDto,
        public readonly id: string
    ){}
}