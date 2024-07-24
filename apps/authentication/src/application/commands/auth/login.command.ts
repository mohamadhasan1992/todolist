import { LoginUserDto } from "@app/common";


export class LoginCommand {
    constructor(
      public readonly loginUserDto: LoginUserDto
    ) {}
}
  
