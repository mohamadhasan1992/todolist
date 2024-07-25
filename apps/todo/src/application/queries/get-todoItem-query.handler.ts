import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoItemsQuery } from './get-todoItem-query';
import { TodoItemEntityRepository } from '../../infrastructure/repositories/todoItem-entity.repository';




@QueryHandler(GetTodoItemsQuery)
export class GetTodoItemsHandler implements IQueryHandler<GetTodoItemsQuery> {
  constructor(private readonly todoItemRepository: TodoItemEntityRepository) {}

  async execute(query: GetTodoItemsQuery) {
    return this.todoItemRepository.findAll(query);
  }
}
