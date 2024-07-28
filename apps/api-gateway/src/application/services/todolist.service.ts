import { 
  CreateTodoListDto, 
  DeleteTodoItemDto, 
  FindMyTodoListDto, 
  TODO_SERVICE, 
  TODO_SERVICE_NAME, 
  TodoServiceClient, 
  // TODO_SERVICE_NAME, 
  // TodoServiceClient, 
  UpdateTodoListDto, 
  handleError } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';




@Injectable()
export class TodolistService implements OnModuleInit {
  private todoService: TodoServiceClient;

  constructor(
    @Inject(TODO_SERVICE) private client: ClientGrpc 
  ){}

  onModuleInit() {
    this.todoService = this.client.getService<TodoServiceClient>(TODO_SERVICE_NAME);
  }


  async create(createTodolistDto: CreateTodoListDto) {
    return await handleError(this.todoService.createTodoList(createTodolistDto));
  }

  async findAll(
    findMyTodoListDto: FindMyTodoListDto
  ) {
    return await handleError(this.todoService.findTodoList(findMyTodoListDto));
  }

  async update(updateTodolistDto: UpdateTodoListDto) {
    return await handleError(this.todoService.updateTodoList(updateTodolistDto));
  }

  async remove(deleteTodoListDto: DeleteTodoItemDto) {
    return await handleError(this.todoService.deleteTodoList(deleteTodoListDto))
  }
}
