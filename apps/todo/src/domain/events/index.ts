import { TodoItemCreatedHandler } from "./todoItem/todoItem-created.handler";
import { TodoListCreatedHandler } from "./todoList/todoList-created.handler";



export const TodoEventHandlers = [TodoItemCreatedHandler, TodoListCreatedHandler]