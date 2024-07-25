import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListsQuery } from './get-todoList-query';
import { TodoListEntityRepository } from '../../infrastructure/repositories/todoList-entity.repository';





@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
  constructor(private readonly todoRepository: TodoListEntityRepository) {}

  async execute({userId}: GetTodoListsQuery) {
    return this.todoRepository.findAll({user: userId});
  }
}
