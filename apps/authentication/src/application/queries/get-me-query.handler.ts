import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMeQuery } from './get-me-query';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';




@QueryHandler(GetMeQuery)
export class getMeQueryHandler implements IQueryHandler<GetMeQuery> {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute({userId}: GetMeQuery) {
    return this.userRepository.findById(userId);
  }
}
