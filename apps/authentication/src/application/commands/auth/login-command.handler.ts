import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { AuthService } from '../../services/auth.service';




@CommandHandler(LoginCommand)
export class loginUserHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly authService: AuthService,
  ) {}

  async execute({loginUserDto}: LoginCommand) {
    const {
      email,
      password
    } = loginUserDto;

    
    return await this.authService.login(email, password)

  }
}
