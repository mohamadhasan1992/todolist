import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './create-todoList.command';
import { TodoList } from '../../domain/entities/todo.entity';
import { Inject } from '@nestjs/common';
import { ITodoListRepository } from '../../domain/repositories/todo.repository.interface';







@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(@Inject('ITodoListRepository') private readonly todoRepository: ITodoListRepository) {}

  async execute(command: CreateTodoListCommand): Promise<TodoList> {
    const { user, label } = command;
    const todo = new TodoList(null, user, label);
    return await this.todoRepository.create(todo);
  }
}
