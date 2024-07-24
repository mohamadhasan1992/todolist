// src/infrastructure/database/todo/todo.schema.ts
import { IdentifiableEntitySchema } from '@app/common/database/identifiable-entity.schema';
import { Prop, Schema } from '@nestjs/mongoose';


@Schema({versionKey: false, collection: "User"})
export class UserSchema extends IdentifiableEntitySchema {
  @Prop({type: String})
    name: string;

    @Prop({type: String, unique: true})
    email: string;

    @Prop({type: String})
    password: string
}


