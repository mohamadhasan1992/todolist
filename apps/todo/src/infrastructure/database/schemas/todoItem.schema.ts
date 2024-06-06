// src/infrastructure/database/todo/todo.schema.ts
import { IdentifiableEntitySchema } from '@app/common/database/identifiable-entity.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class TodoItemDocument extends IdentifiableEntitySchema {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String })
  priority: string;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItemDocument);