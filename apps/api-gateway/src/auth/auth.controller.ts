import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthenticatedUser, LoginUserDto, SignUpUserDto } from '@app/common';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RpcException } from '@nestjs/microservices';
import { CurrentUser } from './decorators/current-user.decorator';





@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() signUpUserDto: SignUpUserDto) {
    console.log("signup body api-gateway", signUpUserDto)
    return this.authService.sinupUser(signUpUserDto)
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    console.log("login body", loginUserDto)
    return this.authService.loginUser(loginUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: IAuthenticatedUser) {
    return user;
  }

}
