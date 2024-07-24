import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserEntityFactory } from 'apps/authentication/src/domain/entityFactory/UserEntity.factory';
import { LoginCommand } from './login.command';
import { UserEntityRepository } from 'apps/authentication/src/infrustructure/repositories/user-entity.repository';




@CommandHandler(LoginCommand)
export class loginUserHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userFactory: UserEntityFactory,
    private readonly userRepository: UserEntityRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({loginUserDto}: LoginCommand): Promise<void> {
    const {
      email,
      password
    } = loginUserDto;

    
    const foundUser = await this.userRepository.findOne({email});
    // check for password
    // return user
    return foundUser;

  

  }
}
