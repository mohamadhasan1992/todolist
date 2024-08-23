import { UpdateTodoItemDto } from "@app/common";



export class UpdateTodoItemCommand {
    constructor(
      public readonly updateTodoItemDto: UpdateTodoItemDto
    ) {}
}
  
