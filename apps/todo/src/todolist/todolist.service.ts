import { CommandTodoListResponse, CreateTodoListDto, DeleteTodoListDto, FindMyTodoListDto, UpdateTodoListDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodolistEntity } from './db/todolist.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';




@Injectable()
export class TodolistService {

  constructor(
    @InjectRepository(TodolistEntity)
    private readonly todoListRepository: Repository<TodolistEntity>,
  ) {}


  async create(createTodolistDto: CreateTodoListDto) : Promise<CommandTodoListResponse> {
    const { user, label } = createTodolistDto; 

    const newTodoList = this.todoListRepository.create({
      user,
      label,
      last_item_createdAt: new Date()
    });

    return await this.todoListRepository.save(newTodoList)
  }

  async findAll(findMyTodoListDto: FindMyTodoListDto): Promise<TodolistEntity[]>{
    const { userId: user } = findMyTodoListDto;
    return await this.todoListRepository.find({
      where: {user},
      relations: {
        todoItems: true,
      },
      order: {
        last_item_createdAt: "DESC",
        todoItems: {
            priority: "DESC"
       }
      }
    })
    
  }

  async update(id: number, updateTodolistDto: UpdateTodoListDto): Promise<CommandTodoListResponse> {
    const {user} = updateTodolistDto; 
    const todoList = await this.todoListRepository.findOne({where: {id}});
    if (!todoList) {
      throw new RpcException("Todo Not Found");
    }
    if(todoList.user !== user ){
      throw new RpcException("UnAuthorized, You can delete only your todolists")
    }

    const updatedTodoList = Object.assign(todoList, {label: updateTodolistDto.label});
    return this.todoListRepository.save(updatedTodoList);
  }

  async remove(deleteTodoListDto: DeleteTodoListDto) {
    const { id, user } = deleteTodoListDto;
    const todoList = await this.todoListRepository.findOne({where: {id}});
    
    if(!todoList){
      throw new RpcException("Todo Not Found!")
    }
    if(todoList.user !== user ){
      throw new RpcException("UnAuthorized, You can delete only your todolists")
    }
    await this.todoListRepository.delete(id);
    return {message: "TodoList deleted successfully!"}
  }

  async findById(id: number){
    return await this.todoListRepository.findOne({where: {id}})
  }



}
