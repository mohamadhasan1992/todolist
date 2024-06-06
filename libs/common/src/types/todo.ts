/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

// export const protobufPackage = "todo";

export interface TodoLists {
  todolists: TodoList[];
}

export interface TodoList {
  id: string;
  label: string;
  todoItems: TodoItem[];
}

export interface CreateTodoListDto {
  label: string;
  user: string;
}

export interface CommandTodoListResponse {
  label: string;
  user: string;
}

export interface UpdateTodoListDto {
  id: string;
  label: string;
  user: string;
}

export interface DeleteTodoListDto {
  id: string;
  user: string;
}

export interface DeleteResponse {
  message: string;
}

export interface TodoItems {
  todoItems: TodoItem[];
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  priority: number;
}

export interface CreateTodoItemDto {
  title: string;
  description: string;
  priority: number;
  user: string;
  todoList: number;
}

export interface UpdateTodoItemDto {
  id: string;
  title: string;
  description: string;
  priority: number;
  user: string;
}

export interface DeleteTodoItemDto {
  id: string;
  user: string;
}

export interface FindMyTodoListDto {
  userId: string;
}

export interface FindTodoListTodoItemsDto {
  todolist: string;
}

export interface EmptyQurey {
}

export const TODO_PACKAGE_NAME = "todo";

export interface TodoQueryServiceClient {
  findTodoList(request: FindMyTodoListDto): Observable<TodoLists>;
}

export interface TodoQueryServiceController {
  findTodoList(request: FindMyTodoListDto): Promise<TodoLists> | Observable<TodoLists> | TodoLists;
}

export function TodoQueryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findTodoList"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TodoQueryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TodoQueryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TODO_QUERY_SERVICE_NAME = "TodoQueryService";

export interface TodoCommandServiceClient {
  createTodoList(request: CreateTodoListDto): Observable<CommandTodoListResponse>;

  updateTodoList(request: UpdateTodoListDto): Observable<CommandTodoListResponse>;

  deleteTodoList(request: DeleteTodoListDto): Observable<DeleteResponse>;
}

export interface TodoCommandServiceController {
  createTodoList(
    request: CreateTodoListDto,
  ): Promise<CommandTodoListResponse> | Observable<CommandTodoListResponse> | CommandTodoListResponse;

  updateTodoList(
    request: UpdateTodoListDto,
  ): Promise<CommandTodoListResponse> | Observable<CommandTodoListResponse> | CommandTodoListResponse;

  deleteTodoList(request: DeleteTodoListDto): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function TodoCommandServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTodoList", "updateTodoList", "deleteTodoList"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TodoCommandService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TodoCommandService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TODO_COMMAND_SERVICE_NAME = "TodoCommandService";

export interface TodoItemCommandServiceClient {
  createTodoItem(request: CreateTodoItemDto): Observable<TodoItem>;

  updateTodoItem(request: UpdateTodoItemDto): Observable<TodoItem>;

  deleteTodoItem(request: DeleteTodoListDto): Observable<DeleteResponse>;
}

export interface TodoItemCommandServiceController {
  createTodoItem(request: CreateTodoItemDto): Promise<TodoItem> | Observable<TodoItem> | TodoItem;

  updateTodoItem(request: UpdateTodoItemDto): Promise<TodoItem> | Observable<TodoItem> | TodoItem;

  deleteTodoItem(request: DeleteTodoListDto): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function TodoItemCommandServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTodoItem", "updateTodoItem", "deleteTodoItem"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TodoItemCommandService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TodoItemCommandService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TODO_ITEM_COMMAND_SERVICE_NAME = "TodoItemCommandService";
