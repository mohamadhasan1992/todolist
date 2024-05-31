import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListsQuery } from './get-todo-query';
import { TodoListRepository } from 'apps/todo/src/domain/todo/todo.repository.interface';
import { TodoList } from 'apps/todo/src/domain/todo/todo.entity';



@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
  constructor(private readonly todoRepository: TodoListRepository) {}

  async execute(query: GetTodoListsQuery): Promise<TodoList[]> {
    return this.todoRepository.findAll();
  }
}
