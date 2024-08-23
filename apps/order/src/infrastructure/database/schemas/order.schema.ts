import { IdentifiableEntitySchema } from '@app/common/database/identifiable-entity.schema';
import { Prop, Schema } from '@nestjs/mongoose';




@Schema({versionKey: false, timestamps: true, collection: "Order"})
export class OrderSchema extends IdentifiableEntitySchema {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({required: true})
  user: string;

  @Prop({type: Date})
  createdAt: Date;

}


