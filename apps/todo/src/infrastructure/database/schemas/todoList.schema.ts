import { IdentifiableEntitySchema } from '@app/common/database/identifiable-entity.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';




@Schema()
export class TodoListDocument extends IdentifiableEntitySchema {
  @Prop({ required: true, unique: true })
  label: string;

  @Prop({ required: true })
  user: string;

  @Prop({ default: false })
  isCompleted: boolean;
}


export const TodoListSchema = SchemaFactory.createForClass(TodoListDocument);