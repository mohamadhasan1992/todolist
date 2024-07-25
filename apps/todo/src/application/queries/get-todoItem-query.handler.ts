import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoItemsQuery } from './get-todoItem-query';
import { TodoItemEntityRepository } from '../../infrastructure/repositories/todoItem-entity.repository';




@QueryHandler(GetTodoItemsQuery)
export class GetTodoItemsHandler implements IQueryHandler<GetTodoItemsQuery> {
  constructor(private readonly todoItemRepository: TodoItemEntityRepository) {}

  async execute({findTodoItemsByTodoListDto}: GetTodoItemsQuery) {
    const {todoListId} = findTodoItemsByTodoListDto;
    return this.todoItemRepository.findAll({todoList: todoListId});
  }
}
