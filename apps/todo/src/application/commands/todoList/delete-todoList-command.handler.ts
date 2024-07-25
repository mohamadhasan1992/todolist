import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from './delete-todoList.command';
import { TodoListEntityRepository } from 'apps/todo/src/infrastructure/repositories/todoList-entity.repository';
import { RpcException } from '@nestjs/microservices';
import { TodoListDeletedEvent } from 'apps/todo/src/domain/events/todoList/todoList-deleted.event';
import { Types } from 'mongoose';




@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler implements ICommandHandler<DeleteTodoListCommand> {
  constructor(
    private readonly todoListRepository: TodoListEntityRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ deleteTodoListDto }: DeleteTodoListCommand): Promise<{message: string}> {
    const { id } = deleteTodoListDto;
    const todoList = await this.todoListRepository.findOneById(id);
    if (!todoList) {
      throw new RpcException('TodoList Not Found');
    }

    const todoListContext = this.eventPublisher.mergeObjectContext(todoList);
    await this.todoListRepository.delete({ _id: new Types.ObjectId(id) });

    todoListContext.apply(new TodoListDeletedEvent(id));
    todoListContext.commit();

    return { message: 'todoList deleted successfully' };
  }
}
