import { CreateProductDto } from "../../dto/product/CreateProduct.dto";



export class CreateProductCommand {
    constructor(
      public readonly createProductDto: CreateProductDto
    ) {}
}
  
