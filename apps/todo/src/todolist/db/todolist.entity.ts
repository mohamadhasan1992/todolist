import { PostgresAbstractDocument } from "@app/common/postgresdatabase";
import { Column, Entity, OneToMany } from "typeorm";
import { TodoItemEntity } from "../../todo-item/db/todo-item.entity";


@Entity({name: "todoList"})
export class TodolistEntity extends PostgresAbstractDocument {
    @Column()
    user: string;

    @Column()
    label: string;

    @Column()
    last_item_createdAt: Date;

    @OneToMany(() => TodoItemEntity, todoItem => todoItem.todoList)
    todoItems: TodoItemEntity[];


}
