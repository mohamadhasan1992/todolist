import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoItemEntityFactory } from "apps/todo/src/domain/entityFactory/TodoItemEntity.factory";
import { CreateTodoItemCommand } from "./create-todoItem.command";
import { CommandTodoItemResponse } from "@app/common";




@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler implements ICommandHandler<CreateTodoItemCommand> {
  constructor(
    private readonly todoItemFactory: TodoItemEntityFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ createTodoItemDto }: CreateTodoItemCommand): Promise<CommandTodoItemResponse> {
    const {title, description, priority, todoList} = createTodoItemDto;
    const todoItem = this.eventPublisher.mergeObjectContext(
      await this.todoItemFactory.create(title, description, priority, todoList)
    );
    todoItem.commit()
    return {
      id: todoItem.getId(),
      title: todoItem.getTitle(),
      description: todoItem.getDescription(),
      priority: todoItem.getPriority(),
      message: "Todo Item created successfully"
    }
  }
}

