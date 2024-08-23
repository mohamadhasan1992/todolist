import { GetTodoItemsHandler } from "./get-todoItem-query.handler";
import { GetTodoListsHandler } from "./get-todoList-query.handler";



export const TodoQueryHandlers = [GetTodoListsHandler, GetTodoItemsHandler]