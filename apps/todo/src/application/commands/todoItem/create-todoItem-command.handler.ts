import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoItemEntityFactory } from "apps/todo/src/domain/entityFactory/TodoItemEntity.factory";
import { CreateTodoItemCommand } from "./create-todoItem.command";




@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler implements ICommandHandler<CreateTodoItemCommand> {
  constructor(
    private readonly todoItemFactory: TodoItemEntityFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ createTodoItemDto }: CreateTodoItemCommand): Promise<void> {
    const {name, description, priority} = createTodoItemDto;
    const todoItem = this.eventPublisher.mergeObjectContext(
      await this.todoItemFactory.create(name, description, priority)
    );
    todoItem.commit()

  }
}

