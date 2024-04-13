import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, FindOneUserDto, hashData,  } from '@app/common';
import { FilterQuery } from 'mongoose';
import { UserDocument } from './entities/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository
  ){}


  async create(createUserDto: CreateUserDto) {
    // hash password
    const hashedPassword = await hashData(createUserDto.password);

    return await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    });
  }

  async findById(FindOneUserDto: FindOneUserDto) {
    return await this.userRepository.findOne({_id: FindOneUserDto.Id});
  }


  async findOne(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument>{
    return await this.userRepository.findOne(filterQuery);
  }

}
