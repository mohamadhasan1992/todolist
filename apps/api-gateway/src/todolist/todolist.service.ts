import { CreateTodoListDto, DeleteTodoItemDto, FindMyTodoListDto, TODO_SERVICE, TODO_SERVICE_NAME, TodoServiceClient, UpdateTodoListDto, handleError } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';




@Injectable()
export class TodolistService implements OnModuleInit {
  private todoService: TodoServiceClient

  constructor(
    @Inject(TODO_SERVICE) private client: ClientGrpc 
  ){}

  onModuleInit() {
    this.todoService = this.client.getService<TodoServiceClient>(TODO_SERVICE_NAME)
  }


  create(createTodolistDto: CreateTodoListDto) {
    return handleError(this.todoService.createTodoList(createTodolistDto));
  }

  findAll(
    findMyTodoListDto: FindMyTodoListDto
  ) {
    return handleError(this.todoService.findTodoList(findMyTodoListDto));
  }

  update(updateTodolistDto: UpdateTodoListDto) {
    return handleError(this.todoService.updateTodoList(updateTodolistDto));
  }

  remove(deleteTodoListDto: DeleteTodoItemDto) {
    return handleError(this.todoService.deleteTodoList(deleteTodoListDto))
  }
}
