import { 
  IAuthenticatedUser, 
  AuthActionsEnum, 
  handleError
} from '@app/common';
import { AUTH_SERVICE_NAME, AuthServiceClient, GetMeDto } from '@app/common/types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {  Observable } from 'rxjs';
import { ApiGatewayKafkaService } from '../../infrustructure/messaging/api-gateway-kafka.service';
import { SignUpUserDto } from '../../presentation/dto/signup-user.dto';
import { LoginUserDto } from 'apps/authentication/src/application/dto/login-user.dto';




@Injectable()
export class AuthService implements OnModuleInit {
    private authService: AuthServiceClient

    constructor(
      @Inject(AUTH_SERVICE_NAME) private client: ClientGrpc,
      private readonly kafkaService: ApiGatewayKafkaService
    ){}

    onModuleInit() {
      this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }


    async sinupUser(signUpUserDto: SignUpUserDto){
      const {success, data, message} = await this.kafkaService.sendRequestToAuthService(
        {
          ...signUpUserDto,
          action: AuthActionsEnum.Signup
        }
      );
      return {
        success, data, message
      }
    } 

    async loginUser(loginUserDto: LoginUserDto){
      const {success, data, message} = await this.kafkaService.sendRequestToAuthService(
        {
          ...loginUserDto,
          action: AuthActionsEnum.Login
        }
      );

      return {
        success, data, message      
      }
    }


    async getMe(getMeDto: GetMeDto): Promise<Observable<IAuthenticatedUser>>{
      return await handleError(this.authService.getMe(getMeDto));
    }


}
