import { CreateProductHandler } from "./product/create-product-command.handler";
import { DeleteProductHandler } from "./product/delete-product-command.handler";
import { UpdateProductHandler } from "./product/update-product-command.handler";



export const ProductCommandHandlers = [
    CreateProductHandler, 
    UpdateProductHandler, 
    DeleteProductHandler, 
]