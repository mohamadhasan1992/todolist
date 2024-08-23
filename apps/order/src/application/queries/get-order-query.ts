import { FindOneQuery } from "@app/common";


export class GetOneOrderQuery {
    constructor(
        public findOrderById: FindOneQuery
    ){}
}