import { CreateTodoItemDto } from "../../dto/todoItem/CreateTodoItem.dto";



export class CreateTodoItemCommand {
    constructor(
      public readonly createTodoItemDto: CreateTodoItemDto
    ) {}
}
  
