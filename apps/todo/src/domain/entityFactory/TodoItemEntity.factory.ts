import { EntityFactory } from "@app/common/database/entity.factory";
import { Types } from "mongoose";
import { TodoItem } from "../entities/todoItem.entity";
import { TodoItemEntityRepository } from "../../infrastructure/repositories/todoItem-entity.repository";
import { Injectable } from "@nestjs/common";
import { TodoItemCreatedEvent } from "../events/todoItem/todoItem-created.event";



@Injectable()
export class TodoItemEntityFactory implements EntityFactory<TodoItem>{
    constructor(
        private readonly todoItemRepository: TodoItemEntityRepository
    ){}

    async create(name: string, description: string, priority: string): Promise<TodoItem> {
        const todoItem = new TodoItem(
            new Types.ObjectId().toHexString(), 
            name, 
            description,
            priority
        )
        await this.todoItemRepository.create(todoItem)
        todoItem.apply(
            new TodoItemCreatedEvent(todoItem.getId())
        );
        return todoItem
    }
}