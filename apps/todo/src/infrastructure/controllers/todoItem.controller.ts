import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TodoItem } from '../../domain/entities/todoItem.entity';
import { GetTodoItemsQuery } from '../../application/queries/get-todoItem-query';
import { CreateTodoItemDto } from '../../application/dto/todoItem/CreateTodoItem.dto';
import { CreateTodoItemCommand } from '../../application/commands/todoItem/create-todoItem.command';




@Controller('todo-item')
export class TodoItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createTodo(
    @Body() createTodoItemDto :CreateTodoItemDto,
  ): Promise<void> {
    await this.commandBus.execute(new CreateTodoItemCommand(createTodoItemDto ));
  }

  @Get()
  async getTodos(): Promise<TodoItem[]> {
    return this.queryBus.execute(new GetTodoItemsQuery());
  }
}



