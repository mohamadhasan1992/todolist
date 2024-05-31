import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../../application/todoList/command/create-todoList.command';
import { GetTodoListsQuery } from '../../application/todoList/query/get-todo-query';
import { TodoList } from '../../domain/todo/todo.entity';


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
    await this.commandBus.execute(new CreateTodoListCommand(label, user));
  }

  @Get()
  async getTodos(): Promise<TodoList[]> {
    return this.queryBus.execute(new GetTodoListsQuery());
  }
}