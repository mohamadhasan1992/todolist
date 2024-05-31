import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoListDocument } from './todo.schema';
import { TodoList } from '../../domain/todo/todo.entity';
import { TodoListRepository } from '../../domain/todo/todo.repository.interface';

export class MongooseTodoListRepository implements TodoListRepository {
  constructor(
    @InjectModel('TodoList') private readonly todoModel: Model<TodoListDocument>,
  ) {}

  async findById(id: string): Promise<TodoList | null> {
    const todo = await this.todoModel.findById(id).lean().exec();
    return todo ? new TodoList(todo._id, todo.label, todo.user) : null;
  }

  async findAll(): Promise<TodoList[]> {
    const todos = await this.todoModel.find().lean().exec();
    return todos.map(todo => new TodoList(todo._id, todo.label, todo.user));
  }

  async save(todo: TodoList): Promise<void> {
    await this.todoModel.updateOne(
      { _id: todo._id },
      { label: todo.label, user: todo.user },
      { upsert: true }
    ).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.todoModel.deleteOne({ _id: id }).exec();
  }
}