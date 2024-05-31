import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './create-todoList.command';
import { TodoListRepository } from 'apps/todo/src/domain/todo/todo.repository.interface';
import { TodoList } from 'apps/todo/src/domain/todo/todo.entity';




@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(private readonly todoRepository: TodoListRepository) {}

  async execute(command: CreateTodoListCommand): Promise<void> {
    const { user, label } = command;
    const todo = new TodoList(null, user, label);
    await this.todoRepository.save(todo);
  }
}
