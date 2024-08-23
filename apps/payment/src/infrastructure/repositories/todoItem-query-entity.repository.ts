import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TodoItemSchema } from "../database/schemas/todoItem.schema";
import { TodoItem } from "../../domain/entities/todoItem.entity";
import { TodoItemSchemaFactory } from "../database/schema-factory/todoItem-schema.factory";
import { BaseQueryEntityRepository } from "@app/common/database/query-entity.repository";



@Injectable()
export class TodoItemQueryEntityRepository extends BaseQueryEntityRepository<TodoItemSchema, TodoItem>{
    constructor(
        @InjectModel("queryTodoItem", "query")
        todoItemModel: Model<TodoItemSchema>,
        todoItemSchemaFactory: TodoItemSchemaFactory
    ){
        super(todoItemModel, todoItemSchemaFactory);
    }

}