import { AUTH_SERVICE, AUTH_SERVICE_NAME, AuthServiceClient, GetMeDto, LoginUserDto, SignUpUserDto, handleError } from '@app/common';
import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';




@Injectable()
export class AuthService implements OnModuleInit {
    private authService: AuthServiceClient

    constructor(
      @Inject(AUTH_SERVICE) private client: ClientGrpc 
    ){}

    onModuleInit() {
      this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }


    sinupUser(signUpUserDto: SignUpUserDto){
      return handleError(this.authService.sinUpUser(signUpUserDto))
    } 

    loginUser(loginUserDto: LoginUserDto){
      console.log("auth service login api-gateway")
      return handleError(this.authService.loginUser(loginUserDto))
    }


    getMe(getMeDto: GetMeDto){
      return handleError(this.authService.getMe(getMeDto));
    }
}
