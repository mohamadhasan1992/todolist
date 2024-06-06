import { TodoItem } from "../entities/todoItem.entity";



export interface ITodoItemRepository {
  findById(id: string): Promise<TodoItem | null>;
  findAll(): Promise<TodoItem[]>;
  save(todo: TodoItem): Promise<void>;
  deleteById(id: string): Promise<void>;
}