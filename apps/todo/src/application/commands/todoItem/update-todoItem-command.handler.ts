import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTodoItemCommand } from "./update-todoItem.command";
import { CommandTodoItemResponse } from "@app/common";
import { Inject } from "@nestjs/common";
import { ITodoItemCommandRepository, ITodoItemQueryRepository } from "apps/todo/src/domain/repositories/todoItem.repository.interface";




@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler implements ICommandHandler<UpdateTodoItemCommand> {
  constructor(
    @Inject("TodoItemCommandRepository")
    private readonly todoItemRepository: ITodoItemCommandRepository,
    @Inject("TodoItemQueryRepository")
    private readonly todoItemQueryRepository: ITodoItemQueryRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ updateTodoItemDto }: UpdateTodoItemCommand): Promise<CommandTodoItemResponse> {
    const { id, title, description, priority } = updateTodoItemDto;

    // Fetch the existing todo item
    const todoItem = this.eventPublisher.mergeObjectContext(
      await this.todoItemQueryRepository.findOneById(id),
    );

    // Apply the updates
    todoItem.updateDetails(title, description, priority);

    // Save the updated todo item back to the repository
    await this.todoItemRepository.findOneAndReplaceById(id, todoItem);
    
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

