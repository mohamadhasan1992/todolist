import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from '../../application/commands/create-todoItem.command';
import { TodoItem } from '../../domain/entities/todoItem.entity';
import { GetTodoItemsQuery } from '../../application/queries/get-todoItem-query';




@Controller('todo-item')
export class TodoItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createTodo(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('priority') priority: string,
  ): Promise<void> {
    await this.commandBus.execute(new CreateTodoItemCommand(title, description, priority));
  }

  @Get()
  async getTodos(): Promise<TodoItem[]> {
    return this.queryBus.execute(new GetTodoItemsQuery());
  }
}



