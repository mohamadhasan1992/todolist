import { AUTH_SERVICE, AUTH_SERVICE_NAME, AuthServiceClient, GetMeDto, IAuthenticatedUser, LoginUserDto, SignUpUserDto, handleError } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';




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
      return handleError(this.authService.loginUser(loginUserDto))
    }


    getMe(getMeDto: GetMeDto): Observable<IAuthenticatedUser>{
      return handleError(this.authService.getMe(getMeDto));
    }

}
