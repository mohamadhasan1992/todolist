import { BaseEntityRepository } from "@app/common/database/base-entity.repository";
import { TodoListSchema } from "../database/schemas/todoList.schema";
import { TodoList } from "../../domain/entities/todo.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TodoListSchemaFactory } from "../database/schema-factory/todoList-schema.factory";



@Injectable()
export class TodoListEntityRepository extends BaseEntityRepository<TodoListSchema, TodoList>{
    constructor(
        @InjectModel(TodoListSchema.name, 'primary')
        todoListModel: Model<TodoListSchema>,
        todoListSchemaFactory: TodoListSchemaFactory
    ){
        super(todoListModel, todoListSchemaFactory);
    }


}