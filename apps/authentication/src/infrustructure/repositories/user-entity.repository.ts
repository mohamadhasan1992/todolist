import { BaseEntityRepository } from "@app/common/database/base-entity.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSchema } from "../database/schema/user.schema";
import { User } from "../../domain/entities/user.entity";
import { UserSchemaFactory } from "../database/schema-factory/user-schema.factory";



@Injectable()
export class UserEntityRepository extends BaseEntityRepository<UserSchema, User>{
    constructor(
        @InjectModel("queryUser")
        userModel: Model<UserSchema>,
        userSchemaFactory: UserSchemaFactory
    ){
        super(userModel, userSchemaFactory);
    }

    async findByEmail(email: string): Promise<User>{
        return await this.findOne({email})
    }

}