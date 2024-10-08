import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMeQuery } from './get-me-query';
import { Inject } from '@nestjs/common';
import { IUserQueryRepository } from '../../domain/repositories/user.repository.interface';




@QueryHandler(GetMeQuery)
export class getMeQueryHandler implements IQueryHandler<GetMeQuery> {
  constructor(
    @Inject("UserQueryRepository")
    private readonly userQueryRepository: IUserQueryRepository
  ) {}

  async execute({userId}: GetMeQuery) {
    const user = await this.userQueryRepository.findById(userId);
    return {
      _id: user.getId(),
      name: user.getName(),
      email: user.getEmail()
    }
  }
}
