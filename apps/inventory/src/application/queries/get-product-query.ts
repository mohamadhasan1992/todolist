import { FindOneQuery } from "@app/common";


export class GetProductQuery {
    constructor(
        public findProductById: FindOneQuery
    ){}
}