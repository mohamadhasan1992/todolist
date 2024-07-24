import { EntitySchemaFactory } from "@app/common/database/entity-schema.factory";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { UserSchema } from "../schema/user.schema";
import { User } from "apps/authentication/src/domain/entities/user.entity";



@Injectable()
export class UserSchemaFactory implements EntitySchemaFactory<UserSchema, User>{
    create(user: User): UserSchema {
        return{
            _id: new Types.ObjectId(user.getId()),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword()
        }
    }
    createFromSchema(user: UserSchema): User {
        return new User(
            user._id.toHexString(),
            user.name,
            user.email,
            user.password
        )
    }
}