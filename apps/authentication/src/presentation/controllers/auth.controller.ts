import { 
  AuthServiceController, 
  AuthServiceControllerMethods, 
  GetMeDto, 
  LoginUserDto, 
  // SignUpUserDto
} from '@app/common';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Payload, RpcException } from '@nestjs/microservices';
import { SignUpCommand } from '../../application/commands/auth/signup.command';
import { LoginCommand } from '../../application/commands/auth/login.command';
import { GetMeQuery } from '../../application/queries/get-me-query';




@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // async sinUpUser(@Payload() signUpUserDto: SignUpUserDto) {
  //   try{
  //     return await this.commandBus.execute(new SignUpCommand(signUpUserDto ));
  //   }catch(err){
  //     throw new RpcException(err.message)
  //   }
  // }

  async loginUser(
    @Payload() loginUserDto: LoginUserDto
  ) {
    return await this.commandBus.execute(new LoginCommand(loginUserDto ));
  }

  async getMe(
    @Payload() getMeDto: GetMeDto
  ){
    const { userId } = getMeDto;
    return await this.queryBus.execute(new GetMeQuery(userId));
  } 
}



