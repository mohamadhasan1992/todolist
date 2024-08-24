import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IUserQueryRepository } from '../../domain/repositories/user.repository.interface';
import { GetUserByEmailQuery } from './get-user-by-email-query';




@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
    constructor(
        @Inject("UserQueryRepository")
        private readonly userQueryRepository: IUserQueryRepository
      ) {}

    async execute({email}: GetUserByEmailQuery) {
        return await this.userQueryRepository.findByEmail(email);
    }
}
