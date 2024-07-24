import { AuthServiceController, AuthServiceControllerMethods, GetMeDto, LoginUserDto, SignUpUserDto } from '@app/common';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { SignUpCommand } from '../../application/commands/auth/signup.command';
import { LoginCommand } from '../../application/commands/auth/login.command';
import { GetMeQuery } from '../../application/queries/get-me-query';




@AuthServiceControllerMethods()
@Controller()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async sinUpUser(@Payload() signUpUserDto: SignUpUserDto) {
    console.log("signupUserDto authenticatSRV controller", signUpUserDto)
    return await this.commandBus.execute(new SignUpCommand(signUpUserDto ));
  }

  async loginUser(
    @Payload() loginUserDto: LoginUserDto
  ) {
    console.log("login user authentication", loginUserDto)
    return await this.commandBus.execute(new LoginCommand(loginUserDto ));
  }

  getMe(
    @Payload() getMeDto: GetMeDto
  ){
    const { userId } = getMeDto;
    return this.queryBus.execute(new GetMeQuery(userId));
  } 
}



