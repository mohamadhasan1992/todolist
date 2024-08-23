import { PartialType } from "@nestjs/mapped-types";
import { CreatePaymentDto } from "./CreatePayment.dto";



export class UpdatePaymentDto extends PartialType(CreatePaymentDto){}