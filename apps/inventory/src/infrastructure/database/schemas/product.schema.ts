import { IdentifiableEntitySchema } from '@app/common/database/identifiable-entity.schema';
import { Prop, Schema } from '@nestjs/mongoose';




@Schema({versionKey: false, collection: "Product"})
export class ProductSchema extends IdentifiableEntitySchema {
  @Prop({ required: true, unique: true })
  label: string;

  @Prop({ required: true })
  user: string;

  @Prop({required: true})
  price: number;

  @Prop({default: 0})
  quantity: number;
}


