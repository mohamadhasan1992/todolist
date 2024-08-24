import { 
  AuthServiceController, 
  AuthServiceControllerMethods, 
  FindUserByEmailDto, 
  GetMeDto, 
  LoginUserDto,
  LoginUserResponse, 
  // SignUpUserDto
} from '@app/common';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Payload, RpcException } from '@nestjs/microservices';
import { LoginCommand } from '../../application/commands/auth/login.command';
import { GetMeQuery } from '../../application/queries/get-me-query';
import { GetUserByEmailQuery } from '../../application/queries/get-user-by-email-query';
import { SignUpUserDto } from '../../application/dto/signup-user.dto';
import { SignUpCommand } from '../../application/commands/auth/signup.command';




@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async findUserByEmail(@Payload() {email}: FindUserByEmailDto) {
    try{
      console.log("findUserByEmail", email)
      return await this.queryBus.execute(new GetUserByEmailQuery(email));
    }catch(err){
      throw new RpcException(err.message)
    }
  }

  async signUpUser(
    @Payload() signupUserDto: SignUpUserDto
  ){
    return await this.commandBus.execute(new SignUpCommand(signupUserDto))
  }

  async loginUser(
    @Payload() loginUserDto: LoginUserDto
  ): Promise<LoginUserResponse>{
    return await this.commandBus.execute(new LoginCommand(loginUserDto ));
  }

  async getMe(
    @Payload() getMeDto: GetMeDto
  ){
    const { userId } = getMeDto;
    return await this.queryBus.execute(new GetMeQuery(userId));
  } 
}



