import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTodoItemsQuery } from '../../application/queries/get-todoItem-query';
import { CreateTodoItemDto } from '../../application/dto/todoItem/CreateTodoItem.dto';
import { CreateTodoItemCommand } from '../../application/commands/todoItem/create-todoItem.command';
import { CommandTodoItemResponse, DeleteTodoItemDto, FindTodoItemsByTodoListDto, TodoItems, TodoItemServiceController, TodoItemServiceControllerMethods, UpdateTodoItemDto } from '@app/common';
import { Payload } from '@nestjs/microservices';
import { UpdateTodoItemCommand } from '../../application/commands/todoItem/update-todoItem.command';
import { DeleteTodoItemCommand } from '../../application/commands/todoItem/delete-todoItem.command';
import { TodoItem } from '../../domain/entities/todoItem.entity';




@Controller('todo-item')
@TodoItemServiceControllerMethods()
export class TodoItemController implements TodoItemServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createTodoItem(
    @Payload() createTodoItemDto :CreateTodoItemDto
  ): Promise<CommandTodoItemResponse>{
    const newTodoItem = await this.commandBus.execute(new CreateTodoItemCommand(createTodoItemDto ));
    return {
      message: "Todo item created successFully",
      ...newTodoItem
    }
  }

  
  async updateTodoItem(
    @Payload() updateTodoItemDto: UpdateTodoItemDto
  ): Promise<CommandTodoItemResponse>{
    return await this.commandBus.execute(new UpdateTodoItemCommand(updateTodoItemDto))
  }
  async deleteTodoItem(
    @Payload() deleteTodoItemDto: DeleteTodoItemDto
  ){
    const deletedTodoItem = await this.commandBus.execute(new DeleteTodoItemCommand(deleteTodoItemDto))
    return {
      ...deletedTodoItem,
      message: "TodoItem deleted successfully!"
    }
  }



  async findTodoItemsByList(
    @Payload() findTodoItemsByTodoListDto: FindTodoItemsByTodoListDto
  ): Promise<TodoItems> {
    const todoItems = await this.queryBus.execute(new GetTodoItemsQuery(findTodoItemsByTodoListDto));
    return {
      todoItems: todoItems.map((todoItem: TodoItem) => ({
        ...todoItem,
        id: todoItem.getId()
      }))
    }
  }
}



