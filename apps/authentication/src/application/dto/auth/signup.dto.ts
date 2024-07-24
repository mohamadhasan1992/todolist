import { IsString } from "@nestjs/class-validator";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";



export class SignupUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    password: string;
}