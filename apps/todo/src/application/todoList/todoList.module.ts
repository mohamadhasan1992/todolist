// src/application/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListDatabaseModule } from '../../infrastructure/database/todoList.module';
import { CreateTodoListHandler } from './command/create-todoList-command.handler';
import { GetTodoListsHandler } from './query/get-todoList-query.handler';



@Module({
  imports: [CqrsModule, TodoListDatabaseModule],
  providers: [CreateTodoListHandler, GetTodoListsHandler],
})
export class TodoListApplicationModule {}