import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoItemEntityRepository } from "apps/todo/src/infrastructure/repositories/todoItem-entity.repository";
import { TodoItem } from "apps/todo/src/domain/entities/todoItem.entity";
import { DeleteTodoItemCommand } from "./delete-todoItem.command";
import { CommandTodoItemResponse } from "@app/common";




@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler implements ICommandHandler<DeleteTodoItemCommand> {
  constructor(
    private readonly todoItemEntityRepository: TodoItemEntityRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ deleteTodoItemDto }: DeleteTodoItemCommand): Promise<CommandTodoItemResponse> {
    const { id } = deleteTodoItemDto;

    // Fetch the existing todo item
    const todoItem = this.eventPublisher.mergeObjectContext(
      await this.todoItemEntityRepository.findOneById(id),
    );

    await this.todoItemEntityRepository.delete({_id: id});
    
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

