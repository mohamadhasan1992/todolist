import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSchema } from "../database/schema/user.schema";
import { User } from "../../domain/entities/user.entity";
import { UserSchemaFactory } from "../database/schema-factory/user-schema.factory";
import { BaseCommandEntityRepository } from "@app/common/database/command-entity.repository";



@Injectable()
export class UserCommandEntityRepository extends BaseCommandEntityRepository<UserSchema, User>{
    constructor(
        @InjectModel("commandUser", "command")
        userModel: Model<UserSchema>,
        userSchemaFactory: UserSchemaFactory
    ){
        super(userModel, userSchemaFactory);
    }

    async findByEmail(email: string): Promise<User>{
        return await this.findOne({email})
    }

}