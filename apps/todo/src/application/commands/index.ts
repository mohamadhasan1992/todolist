import { CreateTodoItemHandler } from "./todoItem/create-todoItem-command.handler";
import { CreateTodoListHandler } from "./todoList/create-todoList-command.handler";
import { DeleteTodoListHandler } from "./todoList/delete-todoList-command.handler";
import { UpdateTodoListHandler } from "./todoList/update-todoList-command.handler";



export const TodoCommandHandlers = [CreateTodoListHandler, CreateTodoItemHandler, UpdateTodoListHandler, DeleteTodoListHandler]