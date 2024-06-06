import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITodoListRepository } from '../../domain/repositories/todo.repository.interface';
import { TodoListDocument } from '../database/schemas/todoList.schema';
import { TodoList } from '../../domain/entities/todo.entity';
import { BadRequestException } from '@nestjs/common';



export class MongooseTodoListRepository implements ITodoListRepository {
  constructor(
    @InjectModel(TodoListDocument.name) private readonly todoModel: Model<TodoListDocument>,
  ) {}

  async findById(id: string): Promise<TodoList | null> {
    const todo = await this.todoModel.findById(id).lean().exec();
    return todo ? new TodoList(todo._id.toString(), todo.label, todo.user) : null;
  }

  async findAll(): Promise<TodoList[]> {
    const todos = await this.todoModel.find().lean().exec();
    return todos.map(todo => new TodoList(todo._id.toString(), todo.label, todo.user));
  }

  async create(todo: TodoList): Promise<TodoList>{
    try{
      const newTodo = await this.todoModel.create({...todo, _id: new Types.ObjectId()});
      console.log("new todolist", new TodoList(newTodo._id.toString(), newTodo.label, newTodo.user))
      return new TodoList(newTodo._id.toString(), newTodo.label, newTodo.user)
    }catch(err){
      throw new BadRequestException("err")
    }
  }

  async save(todo: TodoList): Promise<TodoList> {
    const createdTodoList = new this.todoModel({ label: todo.label, user: todo.user });
    const savedTodo = await createdTodoList.save();
    return new TodoList(savedTodo._id.toString(), savedTodo.label, savedTodo.user);
  }

  async deleteById(id: string): Promise<void> {
    await this.todoModel.deleteOne({ _id: id }).exec();
  }
}