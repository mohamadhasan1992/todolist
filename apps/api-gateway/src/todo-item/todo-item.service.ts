import { CreateTodoItemDto, DeleteTodoItemDto, TODO_ITEM_SERVICE_NAME, TODO_SERVICE, TodoItemServiceClient, UpdateTodoItemDto, handleError } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';



@Injectable()
export class TodoItemService implements OnModuleInit {
  private todoItemService: TodoItemServiceClient

  constructor(
    @Inject(TODO_SERVICE) private client: ClientGrpc 
  ){}

  onModuleInit() {
    this.todoItemService = this.client.getService<TodoItemServiceClient>(TODO_ITEM_SERVICE_NAME)
  }


  create(createTodoItemDto: CreateTodoItemDto) {
    return handleError(this.todoItemService.createTodoItem(createTodoItemDto));
  }


  update(updateTodoItemDto: UpdateTodoItemDto) {
    return handleError(this.todoItemService.updateTodoItem(updateTodoItemDto));
  }

  remove(deleteTodoItemDto: DeleteTodoItemDto) {
    return handleError(this.todoItemService.deleteTodoItem(deleteTodoItemDto));
  }
}
