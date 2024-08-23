import { FindOneQuery } from "@app/common";


export class GetOnePaymentQuery {
    constructor(
        public findPaymentById: FindOneQuery
    ){}
}