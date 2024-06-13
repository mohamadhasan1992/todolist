import { EntitySchemaFactory } from "@app/common/database/entity-schema.factory";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { TodoItemSchema } from "../schemas/todoItem.schema";
import { TodoItem } from "apps/todo/src/domain/entities/todoItem.entity";



@Injectable()
export class TodoItemSchemaFactory implements EntitySchemaFactory<TodoItemSchema, TodoItem>{
    create(todoItem: TodoItem): TodoItemSchema {
        return{
            _id: new Types.ObjectId(todoItem.getId()),
            title: todoItem.getDescription(),
            description: todoItem.getDescription(),
            priority: todoItem.getPriority()
        }
    }
    createFromSchema(todoItem: TodoItemSchema): TodoItem {
        return new TodoItem(
            todoItem._id.toHexString(),
            todoItem.title,
            todoItem.description,
            todoItem.priority
        )
    }
}