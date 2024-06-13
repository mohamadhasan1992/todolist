import { BaseEntityRepository } from "@app/common/database/base-entity.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TodoItemSchema } from "../database/schemas/todoItem.schema";
import { TodoItem } from "../../domain/entities/todoItem.entity";
import { TodoItemSchemaFactory } from "../database/schema-factory/todoItem-schema.factory";



@Injectable()
export class TodoItemEntityRepository extends BaseEntityRepository<TodoItemSchema, TodoItem>{
    constructor(
        @InjectModel(TodoItemSchema.name)
        todoItemModel: Model<TodoItemSchema>,
        todoItemSchemaFactory: TodoItemSchemaFactory
    ){
        super(todoItemModel, todoItemSchemaFactory);
    }

}