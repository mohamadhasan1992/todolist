// src/infrastructure/database/todo/todo.schema.ts
import { IdentifiableEntitySchema } from '@app/common/database/identifiable-entity.schema';
import { Prop, Schema } from '@nestjs/mongoose';


@Schema({versionKey: false, collection: "TodoItem"})
export class TodoItemSchema extends IdentifiableEntitySchema {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String })
  priority: string;
}


