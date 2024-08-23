import { ProductListRequest } from "@app/common";

export class GetProductListsQuery {
    constructor(
        public readonly productListRequest: ProductListRequest
      ) {}
}