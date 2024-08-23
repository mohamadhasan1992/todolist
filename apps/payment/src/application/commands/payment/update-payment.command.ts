import { UpdatePaymentDto } from "../../dto/product/UpdatePayment.dto";


export class UpdatePaymentCommand{
    constructor(
        public readonly updatePaymentDto: UpdatePaymentDto,
        public readonly id: string
    ){}
}