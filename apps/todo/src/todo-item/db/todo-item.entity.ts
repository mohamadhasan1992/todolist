import { PostgresAbstractDocument } from "@app/common/postgresdatabase";
import { Column, Entity, ManyToOne } from "typeorm";
import { TodolistEntity } from "../../todolist/db/todolist.entity";
import { Priority } from "@app/common";




@Entity({name: "todoItem"})
export class TodoItemEntity extends PostgresAbstractDocument {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: Priority, default: Priority.LOW })
    priority: Priority;

   @ManyToOne( () => TodolistEntity, (todoList) => todoList.todoItems)
   todoList: TodolistEntity;

}
