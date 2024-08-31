/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";


/** Payment */
export interface PaymentItem {
  id: string;
  user: string;
  createdAt: string;
}

export interface PaymentListRequest {
  user: string;
  createAtFrom: string;
  createAtTo: string;
  page: number;
  limit: number;
  sort: string;
  minQuantity: string;
  maxQuantity: string;
}

export interface PaymentLists {
  PaymentItems: PaymentItem[];
}

export interface FindOnePaymentByIdQuery {
  id: string;
}

export const PAYMENT_PACKAGE_NAME = "payment";

export interface PaymentServiceClient {
  findPaymentList(request: PaymentListRequest): Observable<PaymentLists>;

  findOnePayment(request: FindOnePaymentByIdQuery): Observable<PaymentItem>;
}

export interface PaymentServiceController {
  findPaymentList(request: PaymentListRequest): Promise<PaymentLists> | Observable<PaymentLists> | PaymentLists;

  findOnePayment(request: FindOnePaymentByIdQuery): Promise<PaymentItem> | Observable<PaymentItem> | PaymentItem;
}

export function PaymentServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findPaymentList", "findOnePayment"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PaymentService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PaymentService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PAYMENT_SERVICE_NAME = "PaymentService";
