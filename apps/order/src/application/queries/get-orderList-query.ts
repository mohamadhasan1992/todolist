import { OrderListRequest } from "@app/common";

export class GetOrderListsQuery {
    constructor(
        public readonly orderListRequest: OrderListRequest
      ) {}
}