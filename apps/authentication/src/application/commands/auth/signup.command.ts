import { SignupUserDto } from "../../dto/auth/signup.dto";


export class SignUpCommand {
    constructor(
      public readonly signUpUserDto: SignupUserDto
    ) {}
}
  
