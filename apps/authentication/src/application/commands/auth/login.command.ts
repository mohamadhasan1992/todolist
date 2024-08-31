import { LoginUserDto } from "../../dto/login-user.dto";


export class LoginCommand {
    constructor(
      public readonly loginUserDto: LoginUserDto
    ) {}
}
  
