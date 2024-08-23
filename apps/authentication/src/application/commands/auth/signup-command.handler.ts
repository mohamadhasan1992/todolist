import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from './signup.command';
import { AuthService } from '../../services/auth.service';




@CommandHandler(SignUpCommand)
export class signupUserHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly authService: AuthService
  ) {}

  async execute({signUpUserDto}: SignUpCommand): Promise<any> {
    const {
      name,
      email,
      password
    } = signUpUserDto;


    return await this.authService.signup(name, email, password)
  }
}
