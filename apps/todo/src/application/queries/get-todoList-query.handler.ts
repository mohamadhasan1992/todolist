import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListsQuery } from './get-todoList-query';
import { Inject } from '@nestjs/common';
import { ITodoListRepository } from '../../domain/repositories/todo.repository.interface';





@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
  constructor(
    @Inject("TodoListRepository")
    private readonly todoRepository: ITodoListRepository
  ) {}

  async execute({userId}: GetTodoListsQuery) {
    return this.todoRepository.findAll({user: userId});
  }
}
