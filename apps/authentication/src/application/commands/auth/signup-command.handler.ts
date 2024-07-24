import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from './signup.command';
import { UserEntityFactory } from 'apps/authentication/src/domain/entityFactory/UserEntity.factory';




@CommandHandler(SignUpCommand)
export class signupUserHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly userFactory: UserEntityFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({signUpUserDto}: SignUpCommand): Promise<void> {
    const {
      name,
      email,
      password
    } = signUpUserDto;

    
    const signedUpUser = this.eventPublisher.mergeObjectContext(
      await this.userFactory.create(name, email, password)
    );
    signedUpUser.commit()
  

  }
}
