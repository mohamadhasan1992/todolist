import { FindTodoItemsByTodoListDto } from "@app/common";

export class GetTodoItemsQuery {
    constructor(
        public findTodoItemsByTodoListDto: FindTodoItemsByTodoListDto
    ){}
}