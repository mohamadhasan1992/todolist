import { TodoItemCreatedHandler } from "./todoItem/todoItem-created.handler";
import { TodoListCreatedHandler } from "./todoList/todoList-created.handler";
import { TodoListDeletedHandler } from "./todoList/todoList-deleted.handler";



export const TodoEventHandlers = [TodoItemCreatedHandler, TodoListCreatedHandler, TodoListDeletedHandler];