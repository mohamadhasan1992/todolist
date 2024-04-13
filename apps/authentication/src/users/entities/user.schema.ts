import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




@Schema({timestamps: true})
export class UserDocument extends AbstractDocument {
    @Prop({type: String})
    name: string;

    @Prop({type: String, unique: true})
    email: string;

    @Prop({type: String})
    password: string
}



export const UserSchema = SchemaFactory.createForClass(UserDocument);


