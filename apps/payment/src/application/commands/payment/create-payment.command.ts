import { CreatePaymentDto } from "../../dto/product/CreatePayment.dto";



export class CreatePaymentCommand {
    constructor(
      public readonly createPaymentDto: CreatePaymentDto
    ) {}
}
  
