import { 
  AuthServiceController, 
  AuthServiceControllerMethods, 
  GetMeDto, 
} from '@app/common';
import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { GetMeQuery } from '../../application/queries/get-me-query';
import { QueryBus } from '@nestjs/cqrs';



@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  async getMe(
    @Payload() getMeDto: GetMeDto
  ){
    const { userId } = getMeDto;
    return await this.queryBus.execute(new GetMeQuery(userId));
  } 
}



