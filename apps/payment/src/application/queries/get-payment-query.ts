import { FindOnePaymentByIdQuery } from "@app/common";


export class GetOnePaymentQuery {
    constructor(
        public findPaymentById: FindOnePaymentByIdQuery
    ){}
}