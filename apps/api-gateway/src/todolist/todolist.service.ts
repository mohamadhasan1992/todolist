import { 
  CreateTodoListDto, 
  DeleteTodoItemDto, 
  FindMyTodoListDto, 
  TODO_COMMAND_SERVICE_NAME, 
  TODO_QUERY_SERVICE_NAME, 
  TODO_SERVICE, 
  TodoCommandServiceClient, 
  TodoQueryServiceClient, 
  // TODO_SERVICE_NAME, 
  // TodoServiceClient, 
  UpdateTodoListDto, 
  handleError } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';




@Injectable()
export class TodolistService implements OnModuleInit {
  private todoQueryService: TodoQueryServiceClient;
  private todoCommandService: TodoCommandServiceClient

  constructor(
    @Inject(TODO_SERVICE) private client: ClientGrpc 
  ){}

  onModuleInit() {
    this.todoQueryService = this.client.getService<TodoQueryServiceClient>(TODO_QUERY_SERVICE_NAME);
    this.todoCommandService = this.client.getService<TodoCommandServiceClient>(TODO_COMMAND_SERVICE_NAME);
  }


  create(createTodolistDto: CreateTodoListDto) {
    return handleError(this.todoCommandService.createTodoList(createTodolistDto));
  }

  findAll(
    findMyTodoListDto: FindMyTodoListDto
  ) {
    return handleError(this.todoQueryService.findTodoList(findMyTodoListDto));
  }

  update(updateTodolistDto: UpdateTodoListDto) {
    return handleError(this.todoCommandService.updateTodoList(updateTodolistDto));
  }

  remove(deleteTodoListDto: DeleteTodoItemDto) {
    return handleError(this.todoCommandService.deleteTodoList(deleteTodoListDto))
  }
}
