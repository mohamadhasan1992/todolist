import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from './update-todoList.command';
import { TodoListEntityRepository } from 'apps/todo/src/infrastructure/repositories/todoList-entity.repository';
import { CommandTodoListResponse} from '@app/common';
import { TodoItemEntityRepository } from 'apps/todo/src/infrastructure/repositories/todoItem-entity.repository';




@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler implements ICommandHandler<UpdateTodoListCommand> {
  constructor(
    private readonly todoListRepository: TodoListEntityRepository,
    private readonly todoItemsRepository: TodoItemEntityRepository,
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
    }
  }
}
