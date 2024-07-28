import { 
  CreateTodoItemDto, 
  DeleteTodoItemDto, 
  TODO_ITEM_SERVICE_NAME, 
  TODO_SERVICE, 
  TodoItemServiceClient, 
  UpdateTodoItemDto, 
  handleError 
} from '@app/common';
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

  async find(todoListId: string){
    return await handleError(this.todoItemService.findTodoItemsByList({todoListId}))
  }

  async create(createTodoItemDto: CreateTodoItemDto) {
    return await handleError(this.todoItemService.createTodoItem(createTodoItemDto));
  }


  async update(updateTodoItemDto: UpdateTodoItemDto) {
    return await handleError(this.todoItemService.updateTodoItem(updateTodoItemDto));
  }

  async remove(deleteTodoItemDto: DeleteTodoItemDto) {
    return await handleError(this.todoItemService.deleteTodoItem(deleteTodoItemDto));
  }
}
