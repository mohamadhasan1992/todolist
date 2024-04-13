/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface User {
  Id: string;
  name: string;
  email: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface FindOneUserDto {
  Id: string;
}

export interface SignUpUserResponse {
  message: string;
}

export interface SignUpUserDto {
  name: string;
  email: string;
  password: string;
}

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

export interface Empty {
}

export interface GetMeDto {
  userId: string;
}

export interface Error {
  code: number;
  message: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  sinUpUser(request: SignUpUserDto): Observable<SignUpUserResponse>;

  loginUser(request: LoginUserDto): Observable<LoginUserResponse>;

  getMe(request: GetMeDto): Observable<GetMeUserResponse>;
}

export interface AuthServiceController {
  sinUpUser(request: SignUpUserDto): Promise<SignUpUserResponse> | Observable<SignUpUserResponse> | SignUpUserResponse;

  loginUser(request: LoginUserDto): Promise<LoginUserResponse> | Observable<LoginUserResponse> | LoginUserResponse;

  getMe(request: GetMeDto): Promise<GetMeUserResponse> | Observable<GetMeUserResponse> | GetMeUserResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sinUpUser", "loginUser", "getMe"];
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
