import { SignUpUserDto } from "../../dto/signup-user.dto";


export class SignUpCommand {
    constructor(
      public readonly signUpUserDto: SignUpUserDto
    ) {}
}
  
