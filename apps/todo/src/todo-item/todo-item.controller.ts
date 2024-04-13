import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { TodoItemService } from './todo-item.service';
import { CreateTodoItemDto, DeleteTodoItemDto, TodoItemServiceController, TodoItemServiceControllerMethods, TodoItems, UpdateTodoItemDto } from '@app/common';




@Controller()
@TodoItemServiceControllerMethods()
export class TodoItemController implements TodoItemServiceController {
  constructor(private readonly todoItemService: TodoItemService) {}

  createTodoItem(@Payload() createTodoItemDto: CreateTodoItemDto) {
    return this.todoItemService.create(createTodoItemDto);
  }

  updateTodoItem(@Payload() updateTodoItemDto: UpdateTodoItemDto) {
    return this.todoItemService.update(updateTodoItemDto.id, updateTodoItemDto);
  }

  deleteTodoItem(@Payload() deleteTodoItemDto: DeleteTodoItemDto) {
    return this.todoItemService.remove(deleteTodoItemDto);
  }
}
