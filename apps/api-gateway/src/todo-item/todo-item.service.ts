import { 
  CreateTodoItemDto, 
  DeleteTodoItemDto, 
  TODO_ITEM_COMMAND_SERVICE_NAME, 
  TODO_SERVICE, 
  TodoItemCommandServiceClient, 
  UpdateTodoItemDto, 
  handleError 
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';



@Injectable()
export class TodoItemService implements OnModuleInit {
  private todoItemCommandService: TodoItemCommandServiceClient

  constructor(
    @Inject(TODO_SERVICE) private client: ClientGrpc 
  ){}

  onModuleInit() {
    this.todoItemCommandService = this.client.getService<TodoItemCommandServiceClient>(TODO_ITEM_COMMAND_SERVICE_NAME)
  }


  create(createTodoItemDto: CreateTodoItemDto) {
    return handleError(this.todoItemCommandService.createTodoItem(createTodoItemDto));
  }


  update(updateTodoItemDto: UpdateTodoItemDto) {
    return handleError(this.todoItemCommandService.updateTodoItem(updateTodoItemDto));
  }

  remove(deleteTodoItemDto: DeleteTodoItemDto) {
    return handleError(this.todoItemCommandService.deleteTodoItem(deleteTodoItemDto));
  }
}
