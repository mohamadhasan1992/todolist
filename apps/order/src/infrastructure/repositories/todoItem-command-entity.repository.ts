import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TodoItemSchema } from "../database/schemas/todoItem.schema";
import { TodoItem } from "../../domain/entities/todoItem.entity";
import { TodoItemSchemaFactory } from "../database/schema-factory/todoItem-schema.factory";
import { BaseCommandEntityRepository } from "@app/common/database/command-entity.repository";



@Injectable()
export class TodoItemCommandEntityRepository extends BaseCommandEntityRepository<TodoItemSchema, TodoItem>{
    constructor(
        @InjectModel("commandTodoItem", "command")
        todoItemModel: Model<TodoItemSchema>,
        todoItemSchemaFactory: TodoItemSchemaFactory
    ){
        super(todoItemModel, todoItemSchemaFactory);
    }

}