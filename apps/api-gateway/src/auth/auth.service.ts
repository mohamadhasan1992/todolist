import { AUTH_SERVICE, AUTH_SERVICE_NAME, AuthServiceClient, GetMeDto, LoginUserDto, SignUpUserDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';




@Injectable()
export class AuthService implements OnModuleInit {
    private authService: AuthServiceClient

    constructor(
      @Inject(AUTH_SERVICE) private client: ClientGrpc 
    ){}

    onModuleInit() {
      console.log("init module")
      this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }


    sinupUser(signUpUserDto: SignUpUserDto){
      console.log("auth service signup api-gateway")
      return this.authService.sinUpUser(signUpUserDto)
    } 

    loginUser(loginUserDto: LoginUserDto){
      console.log("auth service login api-gateway")
      return this.authService.loginUser(loginUserDto)
    }


    getMe(getMeDto: GetMeDto){
      return this.authService.getMe(getMeDto);
    }
}
