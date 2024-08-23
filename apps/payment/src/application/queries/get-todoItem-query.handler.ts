import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoItemsQuery } from './get-todoItem-query';
import { Inject } from '@nestjs/common';
import { ITodoItemQueryRepository } from '../../domain/repositories/todoItem.repository.interface';




@QueryHandler(GetTodoItemsQuery)
export class GetTodoItemsHandler implements IQueryHandler<GetTodoItemsQuery> {
  constructor(
    @Inject("TodoItemQueryRepository")
    private readonly todoItemRepository: ITodoItemQueryRepository
  ) {}

  async execute({findTodoItemsByTodoListDto}: GetTodoItemsQuery) {
    const {todoListId} = findTodoItemsByTodoListDto;
    return this.todoItemRepository.findAll({todoList: todoListId});
  }
}
