import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITodoItemRepository } from '../../domain/repositories/todoItem.repository.interface';
import { TodoItemDocument } from '../database/schemas/todoItem.schema';
import { TodoItem } from '../../domain/entities/todoItem.entity';







export class MongooseTodoItemRepository implements ITodoItemRepository {
  constructor(
    @InjectModel(TodoItemDocument.name) private readonly todoItemModel: Model<TodoItemDocument>,
  ) {}

  async findById(id: string): Promise<TodoItem | null> {
    const todoItem = await this.todoItemModel.findById(id).lean().exec();
    return todoItem ? new TodoItem(todoItem._id.toString(), todoItem.title, todoItem.description, todoItem.priority) : null;
  }

  async findAll(): Promise<TodoItem[]> {
    const todoItems = await this.todoItemModel.find().lean().exec();
    return todoItems.map(todoItem => new TodoItem(todoItem._id.toString(), todoItem.title, todoItem.description, todoItem.priority));
  }

  async save(todo: TodoItem): Promise<void> {
    await this.todoItemModel.updateOne(
      { _id: todo._id },
      { 
        title: todo.title, 
        description: todo.description,
        priority: todo.priority
      },
      { upsert: true }
    ).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.todoItemModel.deleteOne({ _id: id }).exec();
  }
}