import { EntityFactory } from "@app/common/database/entity.factory";
import { Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserCreatedEvent } from "../events/user/user-created.event";
import { UserEntityRepository } from "../../infrustructure/repositories/user-entity.repository";



@Injectable()
export class UserEntityFactory implements EntityFactory<User>{
    constructor(
        private readonly userRepository: UserEntityRepository
    ){}

    async create(name: string, email: string, password: string): Promise<User> {
        const user = new User(
            new Types.ObjectId().toHexString(), 
            name, 
            email,
            password
        )
        await this.userRepository.create(user)
        user.apply(
            new UserCreatedEvent(user.getId())
        );
        return user
    }
}