import { AbstractRepository } from "@app/common";
import { Injectable } from "@nestjs/common";
import { UserDocument } from "./entities/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";




@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument>{
    constructor(
        @InjectModel(UserDocument.name) UsersModel: Model<UserDocument>
    ){
        super(UsersModel)
    }
}