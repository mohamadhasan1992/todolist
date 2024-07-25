// src/infrastructure/database/todo/todo.schema.ts
import { IdentifiableEntitySchema } from '@app/common/database/identifiable-entity.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TodoListSchema } from './todoList.schema';


@Schema({versionKey: false, collection: "TodoItem"})
export class TodoItemSchema extends IdentifiableEntitySchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String })
  priority: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: TodoListSchema.name})
  todoList?: string;
}


