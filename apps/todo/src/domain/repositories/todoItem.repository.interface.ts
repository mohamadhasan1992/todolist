import { FilterQuery } from "mongoose";
import { TodoItem } from "../entities/todoItem.entity";
import { TodoItemSchema } from "../../infrastructure/database/schemas/todoItem.schema";



export interface ITodoItemRepository {
  findOneById(id: string): Promise<TodoItem | null>;
  findOne(filterQuery: FilterQuery<TodoItemSchema>): Promise<TodoItem | null>;
  findAll(filterQuery: FilterQuery<TodoItem>): Promise<TodoItem[]>;
  create(TodoItem): Promise<TodoItem>;
  findOneAndReplaceById(id: string, todo: TodoItem): Promise<void>;
  delete(id: string): Promise<void>;
}