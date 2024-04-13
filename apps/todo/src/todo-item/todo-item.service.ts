import { CreateTodoItemDto, DeleteTodoItemDto, TodoItem, UpdateTodoItemDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItemEntity } from './db/todo-item.entity';
import { Repository } from 'typeorm';
import { TodolistService } from '../todolist/todolist.service';
import { RpcException } from '@nestjs/microservices';
import { EventPublisher } from '@nestjs/cqrs';




@Injectable()
export class TodoItemService {

  constructor(
    @InjectRepository(TodoItemEntity)
    private readonly todoItemRepository: Repository<TodoItemEntity>,
    private readonly todoListService: TodolistService,
  ) {}

  async create(createTodoItemDto: CreateTodoItemDto) : Promise<TodoItem> {
    const { description, priority, title, todoList } = createTodoItemDto; 
    // find todoList
    const selectedTodoList = await this.todoListService.findById(todoList);
    if(!selectedTodoList){
      throw new RpcException("Selected TodoList does not exists!")
    }

    const newTodoItem = await this.todoItemRepository.create({
      description: description,
      priority: priority,
      title: title
  
    })
    newTodoItem.todoList = selectedTodoList;
    await this.todoItemRepository.save(newTodoItem);
    // emit an event that new todoItemCreated
    return newTodoItem
  }


  
  async update(id: number, updateTodoItemDto: UpdateTodoItemDto) {
    const { user } = updateTodoItemDto;
    // find todoitem
    const todoItem = await this.todoItemRepository.findOne({where: {id}, relations: {todoList: true}});
    if(!todoItem){
      throw new RpcException("TodoItem Not Found!")
    }
    if(user !== todoItem.todoList.user){
      throw new RpcException("this todoItem is not yours")
    }
    // update it
    const updatedTodoItem = Object.assign(todoItem, {
      title: updateTodoItemDto.title,
      description: updateTodoItemDto.description,
      priority: updateTodoItemDto.priority
    });
    return this.todoItemRepository.save(updatedTodoItem);
  }

  async remove(deleteTodoItemDto: DeleteTodoItemDto) {
    const {id, user} = deleteTodoItemDto;
    const todoItem = await this.todoItemRepository.findOne({where: {id}, relations: {todoList: true}});
    if(!todoItem){
      throw new RpcException("TodoItem Not Found!")
    }
    if(user !== todoItem.todoList.user){
      throw new RpcException("this todoItem is not yours")
    }
    await this.todoItemRepository.delete(id);
    return {message: "TodoItem deleted successfully!"}
  }
}
