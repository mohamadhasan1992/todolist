import { TodoListSchema } from "../database/schemas/todoList.schema";
import { TodoList } from "../../domain/entities/todo.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TodoListSchemaFactory } from "../database/schema-factory/todoList-schema.factory";
import { BaseCommandEntityRepository } from "@app/common/database/command-entity.repository";



@Injectable()
export class TodoListCommandEntityRepository extends BaseCommandEntityRepository<TodoListSchema, TodoList>{
    constructor(
        @InjectModel("commandTodoList", "command")
        todoListModel: Model<TodoListSchema>,
        todoListSchemaFactory: TodoListSchemaFactory
    ){
        super(todoListModel, todoListSchemaFactory);
    }
}