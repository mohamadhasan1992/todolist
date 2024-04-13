import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthServiceController, AuthServiceControllerMethods, GetMeDto, LoginUserDto, SignUpUserDto } from '@app/common';



@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async sinUpUser(@Payload() signUpUserDto: SignUpUserDto) {
    console.log("signupUserDto authenticatSRV controller", signUpUserDto)
    return await this.authService.signUpUser(signUpUserDto);
  }

  loginUser(
    @Payload() loginUserDto: LoginUserDto
  ) {
    console.log("login user authentication", loginUserDto)
    return this.authService.logUserIn(loginUserDto)
  }

  getMe(
    @Payload() getMeDto: GetMeDto
  ){
    return this.authService.getMe(getMeDto)
  } 

  
}
