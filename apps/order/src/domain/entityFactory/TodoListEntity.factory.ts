import { EntityFactory } from "@app/common/database/entity.factory";
import { TodoList } from "../entities/todo.entity";
import { Types } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { TodoListCreatedEvent } from "../events/todoList/todoList-created.event";
import { RpcException } from "@nestjs/microservices";
import { ITodoListCommandRepository } from "../repositories/todo.repository.interface";



@Injectable()
export class TodoListEntityFactory implements EntityFactory<TodoList>{
    constructor(
        @Inject("TodoListCommandRepository")
        private readonly todoListRepository: ITodoListCommandRepository
    ){}

    async create(label: string, user: string): Promise<TodoList> {
        const todoList = new TodoList(
            new Types.ObjectId().toHexString(),
            label,
            user
        )
        try{
            await this.todoListRepository.create(todoList)
        }catch(err){
            throw new RpcException(err.message)
        }
        todoList.apply(
            new TodoListCreatedEvent(todoList.getId())
        );
        return todoList
    }
}