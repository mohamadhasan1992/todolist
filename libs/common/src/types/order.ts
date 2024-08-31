/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";


/** Order */
export interface OrderItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  createdAt: string;
}

export interface OrderListRequest {
  /** Example filter */
  titleFilter: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  page: number;
  limit: number;
  sort: string;
  minQuantity: string;
  maxQuantity: string;
}

export interface OrderLists {
  orderItems: OrderItem[];
}

export interface FindOneOrderByIdQuery {
  id: string;
}

export const ORDER_PACKAGE_NAME = "order";

export interface OrderServiceClient {
  findOrderList(request: OrderListRequest): Observable<OrderLists>;

  findOneOrder(request: FindOneOrderByIdQuery): Observable<OrderItem>;
}

export interface OrderServiceController {
  findOrderList(request: OrderListRequest): Promise<OrderLists> | Observable<OrderLists> | OrderLists;

  findOneOrder(request: FindOneOrderByIdQuery): Promise<OrderItem> | Observable<OrderItem> | OrderItem;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOrderList", "findOneOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
