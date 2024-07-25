import { DeleteTodoItemDto } from "@app/common";



export class DeleteTodoItemCommand {
    constructor(
      public readonly deleteTodoItemDto: DeleteTodoItemDto
    ) {}
}
  
