import { FilterQuery } from "mongoose";
import { TodoList } from "../entities/todo.entity";



export interface ITodoListRepository {
  findOneById(id: string): Promise<TodoList | null>;
  findAll(filterQuery: FilterQuery<TodoList>): Promise<TodoList[]>;
  create(TodoList): Promise<TodoList>,
  save(todo: TodoList): Promise<TodoList>;
  delete(id: string): Promise<void>;
  findOneAndReplaceById(id: string, entity: TodoList): Promise<void>
}