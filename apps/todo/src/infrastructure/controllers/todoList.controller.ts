import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../../application/commands/create-todoList.command';
import { TodoList } from '../../domain/entities/todo.entity';
import { GetTodoListsQuery } from '../../application/queries/get-todoList-query';





@Controller('todoList')
export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createTodo(
    @Body('label') label: string,
    @Body('user') user: string,
  ): Promise<void> {
    return await this.commandBus.execute(new CreateTodoListCommand(label, user));
  }

  @Get()
  async getTodos(): Promise<TodoList[]> {
    return await this.queryBus.execute(new GetTodoListsQuery());
  }
}