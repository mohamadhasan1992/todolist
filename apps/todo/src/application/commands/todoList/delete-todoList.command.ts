import { DeleteTodoListDto } from "../../dto/todoList/UpdateTodoList.dto copy";


export class DeleteTodoListCommand{
    constructor(
        public readonly deleteTodoListDto: DeleteTodoListDto,
    ){}
}