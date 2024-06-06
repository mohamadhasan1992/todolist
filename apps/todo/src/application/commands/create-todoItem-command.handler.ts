import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from './create-todoItem.command';
import { TodoItem } from '../../domain/entities/todoItem.entity';
import { Inject } from '@nestjs/common';
import { ITodoItemRepository } from '../../domain/repositories/todoItem.repository.interface';




@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler implements ICommandHandler<CreateTodoItemCommand> {
  constructor(@Inject('ITodoItemRepository') private readonly todoItemRepository: ITodoItemRepository) {}

  async execute(command: CreateTodoItemCommand): Promise<void> {
    const { title, description, priority } = command;
    const todoItem = new TodoItem(null, title, description, priority);
    await this.todoItemRepository.save(todoItem);
  }
}
