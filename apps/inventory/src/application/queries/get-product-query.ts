import { FindOneProductByIdQuery } from "@app/common";


export class GetProductQuery {
    constructor(
        public findProductById: FindOneProductByIdQuery
    ){}
}