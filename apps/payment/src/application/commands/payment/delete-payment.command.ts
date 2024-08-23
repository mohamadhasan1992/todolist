import { DeletePaymentDto } from "../../dto/product/DeletePayment.dto";




export class DeletePaymentCommand{
    constructor(
        public readonly deletePaymentDto: DeletePaymentDto,
    ){}
}