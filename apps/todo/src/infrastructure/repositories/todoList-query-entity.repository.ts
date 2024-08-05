import { TodoListSchema } from "../database/schemas/todoList.schema";
import { TodoList } from "../../domain/entities/todo.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TodoListSchemaFactory } from "../database/schema-factory/todoList-schema.factory";
import { BaseQueryEntityRepository } from "@app/common/database/query-entity.repository";



@Injectable()
export class TodoListQueryEntityRepository extends BaseQueryEntityRepository<TodoListSchema, TodoList>{
    constructor(
        @InjectModel("queryTodoList", "query")
        todoListModel: Model<TodoListSchema>,
        todoListSchemaFactory: TodoListSchemaFactory
    ){
        super(todoListModel, todoListSchemaFactory);
    }
}