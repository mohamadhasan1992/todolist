import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from './delete-todoList.command';
import { TodoListEntityRepository } from 'apps/todo/src/infrastructure/repositories/todoList-entity.repository';
import { TodoListDeletedEvent } from 'apps/todo/src/domain/events/todoList/todoList-deleted.event';




@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler implements ICommandHandler<DeleteTodoListCommand> {
  constructor(
    private readonly todoListRepository: TodoListEntityRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ deleteTodoListDto }: DeleteTodoListCommand): Promise<void> {
    const { id } = deleteTodoListDto;

    const todoList = this.eventPublisher.mergeObjectContext(
      await this.todoListRepository.findOneById(id)
    );
    
    await this.todoListRepository.delete(deleteTodoListDto);
    todoList.apply(new TodoListDeletedEvent(todoList.getId()))
    todoList.commit()
  }
}
