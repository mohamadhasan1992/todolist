// src/domain/todo/todo.repository.interface.ts
import { TodoList } from './todo.entity';

export interface TodoListRepository {
  findById(id: string): Promise<TodoList | null>;
  findAll(): Promise<TodoList[]>;
  save(todo: TodoList): Promise<void>;
  deleteById(id: string): Promise<void>;
}