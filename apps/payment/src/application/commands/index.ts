import { CreatePaymentHandler } from "./payment/create-payment-command.handler";
import { DeletePaymentHandler } from "./payment/delete-payment-command.handler";
import { UpdatePaymentHandler } from "./payment/update-payment-command.handler";



export const PaymentCommandHandlers = [
    CreatePaymentHandler, 
    UpdatePaymentHandler, 
    DeletePaymentHandler, 
]