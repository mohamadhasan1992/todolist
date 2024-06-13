import { UpdateTodoListDto } from "@app/common";


export class UpdateTodoListCommand{
    constructor(
        public readonly updateTodoListDto: UpdateTodoListDto,
    ){}
}