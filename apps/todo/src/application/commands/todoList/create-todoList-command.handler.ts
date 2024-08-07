import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoListEntityFactory } from 'apps/todo/src/domain/entityFactory/TodoListEntity.factory';
import { CreateTodoListCommand } from './create-todoList.command';
import { CommandTodoListResponse } from '@app/common';




@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
  constructor(
    private readonly todoListFactory: TodoListEntityFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ createTodoListDto }: CreateTodoListCommand): Promise<CommandTodoListResponse> {
    const {label, user} = createTodoListDto;

    const todoList = this.eventPublisher.mergeObjectContext(
      await this.todoListFactory.create(label, user)
    );
    todoList.commit()
    return {
      message: "Todo list created successfully",
      id: todoList.getId(),
      user: todoList.getUser(),
      label: todoList.getLabel()
    }
  }
}
