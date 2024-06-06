import { TodoList } from "../entities/todo.entity";



export interface ITodoListRepository {
  findById(id: string): Promise<TodoList | null>;
  findAll(): Promise<TodoList[]>;
  create(todo: TodoList): Promise<TodoList>;
  save(todo: TodoList): Promise<TodoList>;
  deleteById(id: string): Promise<void>;
}