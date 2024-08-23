import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListsQuery } from './get-todoList-query';
import { Inject } from '@nestjs/common';
import { ITodoListQueryRepository } from '../../domain/repositories/todo.repository.interface';





@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
  constructor(
    @Inject("TodoListQueryRepository")
    private readonly todoRepository: ITodoListQueryRepository
  ) {}

  async execute({userId}: GetTodoListsQuery) {
    return this.todoRepository.findAll({user: userId});
  }
}
