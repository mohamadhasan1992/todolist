/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "query";

/** Auth */
export interface LoginUserDto {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  message: string;
  token: string;
}

export interface GetMeUserResponse {
  Id: string;
  name: string;
  email: string;
}

export interface GetMeDto {
  userId: string;
}

/** Inventory */
export interface ProductItem {
  id: string;
  label: string;
  price: number;
  quantity: number;
}

export interface ProductListRequest {
  /** Example filter */
  labelFilter: string;
  minPrice: number;
  maxPrice: number;
  minQuantity: number;
  maxQuantity: number;
  page: number;
  limit: number;
  sort: string;
}

export interface ProductList {
  productItems: ProductItem[];
}

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

/** Payment */
export interface PaymentItem {
  id: string;
}

export interface PaymentListRequest {
  minQuantity: string;
  maxQuantity: string;
  /** Example filter */
  userId: string;
  page: number;
  limit: number;
  sort: string;
}

export interface PaymentList {
  paymentItems: PaymentItem[];
}

export interface FindOneQuery {
  id: string;
}

export const QUERY_PACKAGE_NAME = "query";

export interface AuthServiceClient {
  loginUser(request: LoginUserDto): Observable<LoginUserResponse>;

  getMe(request: GetMeDto): Observable<GetMeUserResponse>;
}

export interface AuthServiceController {
  loginUser(request: LoginUserDto): Promise<LoginUserResponse> | Observable<LoginUserResponse> | LoginUserResponse;

  getMe(request: GetMeDto): Promise<GetMeUserResponse> | Observable<GetMeUserResponse> | GetMeUserResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["loginUser", "getMe"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";

export interface InventoryServiceClient {
  findProductList(request: ProductListRequest): Observable<ProductList>;

  findOneProduct(request: FindOneQuery): Observable<ProductItem>;
}

export interface InventoryServiceController {
  findProductList(request: ProductListRequest): Promise<ProductList> | Observable<ProductList> | ProductList;

  findOneProduct(request: FindOneQuery): Promise<ProductItem> | Observable<ProductItem> | ProductItem;
}

export function InventoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findProductList", "findOneProduct"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("InventoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("InventoryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const INVENTORY_SERVICE_NAME = "InventoryService";

export interface OrderServiceClient {
  findOrderList(request: OrderListRequest): Observable<OrderLists>;

  findOneOrder(request: FindOneQuery): Observable<OrderItem>;
}

export interface OrderServiceController {
  findOrderList(request: OrderListRequest): Promise<OrderLists> | Observable<OrderLists> | OrderLists;

  findOneOrder(request: FindOneQuery): Promise<OrderItem> | Observable<OrderItem> | OrderItem;
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

export interface PaymentServiceClient {
  findPayment(request: PaymentListRequest): Observable<PaymentList>;

  findOnePayment(request: FindOneQuery): Observable<PaymentItem>;
}

export interface PaymentServiceController {
  findPayment(request: PaymentListRequest): Promise<PaymentList> | Observable<PaymentList> | PaymentList;

  findOnePayment(request: FindOneQuery): Promise<PaymentItem> | Observable<PaymentItem> | PaymentItem;
}

export function PaymentServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findPayment", "findOnePayment"];
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
