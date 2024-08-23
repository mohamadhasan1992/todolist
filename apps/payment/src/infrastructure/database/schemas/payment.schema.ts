import { IdentifiableEntitySchema } from '@app/common/database/identifiable-entity.schema';
import { Prop, Schema } from '@nestjs/mongoose';




@Schema({versionKey: false, timestamps: true, collection: "Payment"})
export class PaymentSchema extends IdentifiableEntitySchema {
  @Prop({required: true})
  user: string;

  @Prop({required: true})
  quantity: number;

  @Prop({type: Date})
  createdAt: Date;

}


