import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoItemsQuery } from './get-todoItem-query';
import { ITodoItemRepository } from '../../domain/repositories/todoItem.repository.interface';
import { TodoItem } from '../../domain/entities/todoItem.entity';
import { Inject } from '@nestjs/common';




@QueryHandler(GetTodoItemsQuery)
export class GetTodoItemsHandler implements IQueryHandler<GetTodoItemsQuery> {
  constructor(@Inject('ITodoListRepository') private readonly todoItemRepository: ITodoItemRepository) {}

  async execute(query: GetTodoItemsQuery): Promise<TodoItem[]> {
    return this.todoItemRepository.findAll();
  }
}
