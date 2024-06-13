import { IdentifiableEntitySchema } from '@app/common/database/identifiable-entity.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';




@Schema({versionKey: false, collection: "TodoList"})
export class TodoListSchema extends IdentifiableEntitySchema {
  @Prop({ required: true, unique: true })
  label: string;

  @Prop({ required: true })
  user: string;
}


