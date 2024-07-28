import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from './update-todoList.command';
import { CommandTodoListResponse} from '@app/common';
import { Inject } from '@nestjs/common';
import { ITodoListRepository } from 'apps/todo/src/domain/repositories/todo.repository.interface';




@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler implements ICommandHandler<UpdateTodoListCommand> {
  constructor(
    @Inject("TodoListRepository")
    private readonly todoListRepository: ITodoListRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ updateTodoListDto }: UpdateTodoListCommand): Promise<CommandTodoListResponse> {
    const {id, label, user} = updateTodoListDto;

    const todoList = this.eventPublisher.mergeObjectContext(
      await this.todoListRepository.findOneById(id)
    );
    todoList.updateTodoList(label, user);
    await this.todoListRepository.findOneAndReplaceById(id, todoList)
    todoList.commit()
    // find todoItems
    return {
      id: todoList.getId(),
      label: todoList.getLabel(),
      user: todoList.getUser(),
      message: "Todo List updated successfully!"
    }
  }
}
