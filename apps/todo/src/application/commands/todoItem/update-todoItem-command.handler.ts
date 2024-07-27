import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTodoItemCommand } from "./update-todoItem.command";
import { TodoItemEntityRepository } from "apps/todo/src/infrastructure/repositories/todoItem-entity.repository";
import { CommandTodoItemResponse } from "@app/common";




@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler implements ICommandHandler<UpdateTodoItemCommand> {
  constructor(
    private readonly todoItemEntityRepository: TodoItemEntityRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ updateTodoItemDto }: UpdateTodoItemCommand): Promise<CommandTodoItemResponse> {
    const { id, title, description, priority } = updateTodoItemDto;

    // Fetch the existing todo item
    const todoItem = this.eventPublisher.mergeObjectContext(
      await this.todoItemEntityRepository.findOneById(id),
    );

    // Apply the updates
    todoItem.updateDetails(title, description, priority);

    // Save the updated todo item back to the repository
    await this.todoItemEntityRepository.findOneAndReplaceById(id, todoItem);
    
    // Commit the changes to trigger events
    todoItem.commit();

    return {
      message: "TodoItem updated successfully",
      id: todoItem.getId(),
      title: todoItem.getTitle(),
      description: todoItem.getDescription(),
      priority: todoItem.getPriority(),
    };

  }
}

