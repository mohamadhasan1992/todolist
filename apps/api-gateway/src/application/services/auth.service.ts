import { 
  IAuthenticatedUser, 
  handleError
} from '@app/common';
import { NatsJetStreamService } from '@app/common/messaging/nats-jetstream.service';
import { AUTH_SERVICE_NAME, AuthServiceClient, GetMeDto, LoginUserDto, SignupUserDto } from '@app/common/types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {  Observable } from 'rxjs';




@Injectable()
export class AuthService implements OnModuleInit {
    private authService: AuthServiceClient

    constructor(
      @Inject(AUTH_SERVICE_NAME) private client: ClientGrpc,
      private readonly jetStreamService: NatsJetStreamService
    ){}

    onModuleInit() {
      this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }


    async sinupUser(signUpUserDto: SignupUserDto){
      console.log("signUpUserDto",signUpUserDto)
      await this.jetStreamService.publish("authentication.command.REGISTER", signUpUserDto)
      // return await handleError(this.authService.signUpUser(signUpUserDto))
    } 

    async loginUser(loginUserDto: LoginUserDto){
      return await handleError(this.authService.loginUser(loginUserDto))
    }


    async getMe(getMeDto: GetMeDto): Promise<Observable<IAuthenticatedUser>>{
      return await handleError(this.authService.getMe(getMeDto));
    }

}
