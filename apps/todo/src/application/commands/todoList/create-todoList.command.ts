import { CreateTodoListDto } from "../../dto/todoList/CreateTodoList.dto";


export class CreateTodoListCommand {
    constructor(
      public readonly createTodoListDto: CreateTodoListDto
    ) {}
}
  
