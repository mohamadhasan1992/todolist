import { CreateOrderHandler } from "./oder/create-order-command.handler";
import { DeleteOrderHandler } from "./oder/delete-order-command.handler";
import { UpdateOrderHandler } from "./oder/update-order-command.handler";



export const OrderCommandHandlers = [
    CreateOrderHandler, 
    UpdateOrderHandler, 
    DeleteOrderHandler, 
]