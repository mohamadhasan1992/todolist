import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMeQuery } from './get-me-query';
import { UserEntityRepository } from '../../infrustructure/repositories/user-entity.repository';




@QueryHandler(GetMeQuery)
export class getMeHandler implements IQueryHandler<GetMeQuery> {
  constructor(private readonly userRepository: UserEntityRepository) {}

  async execute({userId}: GetMeQuery) {

    return this.userRepository.findOne({_id: userId});
  }
}
