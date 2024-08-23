import { PaymentListRequest } from "@app/common";

export class GetPaymentListsQuery {
    constructor(
        public readonly paymentListRequest: PaymentListRequest
      ) {}
}