/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";


/** Inventory */
export interface ProductItem {
  id: string;
  label: string;
  price: number;
  quantity: number;
}

export interface ProductListRequest {
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

export interface FindOneProductByIdQuery {
  id: string;
}

export const INVENTORY_PACKAGE_NAME = "inventory";

export interface InventoryServiceClient {
  findProductList(request: ProductListRequest): Observable<ProductList>;

  findOneProduct(request: FindOneProductByIdQuery): Observable<ProductItem>;
}

export interface InventoryServiceController {
  findProductList(request: ProductListRequest): Promise<ProductList> | Observable<ProductList> | ProductList;

  findOneProduct(request: FindOneProductByIdQuery): Promise<ProductItem> | Observable<ProductItem> | ProductItem;
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
