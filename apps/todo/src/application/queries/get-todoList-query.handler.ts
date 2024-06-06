import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoList } from '../../domain/entities/todo.entity';
import { Inject } from '@nestjs/common';
import { ITodoListRepository } from '../../domain/repositories/todo.repository.interface';
import { GetTodoListsQuery } from './get-todoList-query';





@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
  constructor(@Inject('ITodoListRepository') private readonly todoRepository: ITodoListRepository) {}

  async execute(query: GetTodoListsQuery): Promise<TodoList[]> {
    return this.todoRepository.findAll();
  }
}
