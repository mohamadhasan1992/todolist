import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from './delete-todoList.command';
import { RpcException } from '@nestjs/microservices';
import { TodoListDeletedEvent } from 'apps/todo/src/domain/events/todoList/todoList-deleted.event';
import { CommandTodoListResponse } from '@app/common';
import { Inject } from '@nestjs/common';
import { ITodoListRepository } from 'apps/todo/src/domain/repositories/todo.repository.interface';




@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler implements ICommandHandler<DeleteTodoListCommand> {
  constructor(
    @Inject("TodoListRepository")
    private readonly todoListRepository: ITodoListRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ deleteTodoListDto }: DeleteTodoListCommand): Promise<CommandTodoListResponse> {
    const { id } = deleteTodoListDto;
    const todoList = await this.todoListRepository.findOneById(id);
    if (!todoList) {
      throw new RpcException('TodoList Not Found');
    }

    const todoListContext = this.eventPublisher.mergeObjectContext(todoList);
    await this.todoListRepository.delete(id);
    todoListContext.apply(new TodoListDeletedEvent(id));
    todoListContext.commit();

    return { 
      id: todoList.getId(),
      label: todoList.getLabel(),
      user: todoList.getUser(),
      message: 'todoList deleted successfully' 
    };
  }
}
