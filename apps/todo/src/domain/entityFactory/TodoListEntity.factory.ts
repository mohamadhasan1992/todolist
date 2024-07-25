import { EntityFactory } from "@app/common/database/entity.factory";
import { TodoList } from "../entities/todo.entity";
import { Types } from "mongoose";
import { TodoListEntityRepository } from "../../infrastructure/repositories/todoList-entity.repository";
import { Injectable } from "@nestjs/common";
import { TodoListCreatedEvent } from "../events/todoList/todoList-created.event";
import { RpcException } from "@nestjs/microservices";



@Injectable()
export class TodoListEntityFactory implements EntityFactory<TodoList>{
    constructor(
        private readonly todoListRepository: TodoListEntityRepository
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