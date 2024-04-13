import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthenticatedUser, LoginUserDto, SignUpUserDto } from '@app/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';





@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.sinupUser(signUpUserDto)
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: IAuthenticatedUser) {
    return user;
  }

}
