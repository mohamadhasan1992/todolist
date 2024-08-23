import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { AuthService } from '../../services/auth.service';
import { LoginUserResponse } from '@app/common';




@CommandHandler(LoginCommand)
export class loginUserHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly authService: AuthService,
  ) {}

  async execute({loginUserDto}: LoginCommand): Promise<LoginUserResponse> {
    const {
      email,
      password
    } = loginUserDto;

    
    return await this.authService.login(email, password)

  }
}
