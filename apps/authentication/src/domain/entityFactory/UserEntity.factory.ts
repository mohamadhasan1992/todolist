import { EntityFactory } from "@app/common/database/entity.factory";
import { Types } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserCreatedEvent } from "../events/user/user-created.event";
import { IUserRepository } from "../repositories/user.repository.interface";



@Injectable()
export class UserEntityFactory implements EntityFactory<User>{
    constructor(
        @Inject("UserRepository") 
        private readonly userRepository: IUserRepository
    ){}

    async create(name: string, email: string, password: string): Promise<User> {
        // hash password
        const user = new User(
            new Types.ObjectId().toHexString(), 
            name, 
            email,
            password
        )
        await user.setPassword(password);
        await this.userRepository.create(user)
        user.apply(
            new UserCreatedEvent(user.getId())
        );
        return user
    }
}