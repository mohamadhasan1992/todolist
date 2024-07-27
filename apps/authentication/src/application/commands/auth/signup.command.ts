import { SignUpUserDto } from "@app/common";


export class SignUpCommand {
    constructor(
      public readonly signUpUserDto: SignUpUserDto
    ) {}
}
  
