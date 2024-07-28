import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DeleteTodoItemCommand } from "./delete-todoItem.command";
import { CommandTodoItemResponse } from "@app/common";
import { ITodoItemRepository } from "apps/todo/src/domain/repositories/todoItem.repository.interface";
import { Inject } from "@nestjs/common";




@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler implements ICommandHandler<DeleteTodoItemCommand> {
  constructor(
    @Inject("TodoItemRepository")
    private readonly todoItemRepository: ITodoItemRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ deleteTodoItemDto }: DeleteTodoItemCommand): Promise<CommandTodoItemResponse> {
    const { id } = deleteTodoItemDto;

    // Fetch the existing todo item
    const todoItem = this.eventPublisher.mergeObjectContext(
      await this.todoItemRepository.findOneById(id),
    );

    await this.todoItemRepository.delete(id);
    
    // Commit the changes to trigger events
    todoItem.commit();

    return {
      id: todoItem.getId(),
      title: todoItem.getTitle(),
      description: todoItem.getDescription(),
      message: "Todo item deleted successfully",
      priority: todoItem.getPriority()
    }
  }
}

