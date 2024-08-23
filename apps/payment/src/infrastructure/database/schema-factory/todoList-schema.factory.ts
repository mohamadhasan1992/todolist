import { EntitySchemaFactory } from "@app/common/database/entity-schema.factory";
import { Injectable } from "@nestjs/common";
import { TodoListSchema } from "../schemas/todoList.schema";
import { TodoList } from "apps/todo/src/domain/entities/todo.entity";
import { Types } from "mongoose";



@Injectable()
export class TodoListSchemaFactory implements EntitySchemaFactory<TodoListSchema, TodoList>{
    create(todoList: TodoList): TodoListSchema {
        return{
            _id: new Types.ObjectId(todoList.getId()),
            label: todoList.getLabel(),
            user: todoList.getUser()
        }
    }
    createFromSchema(todoSchema: TodoListSchema): TodoList {
        return new TodoList(
            todoSchema._id.toHexString(),
            todoSchema.label,
            todoSchema.user,
        )
    }
}