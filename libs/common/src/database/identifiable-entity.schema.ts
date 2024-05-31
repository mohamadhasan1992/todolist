import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';



export abstract class IdentifiableEntitySchema {
  @Prop()
  readonly _id: Types.ObjectId;
}
