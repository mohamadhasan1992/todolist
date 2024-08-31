import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { IAuthenticatedUser } from '@app/common';
import { AuthService } from '../../application/services/auth.service';
import { JwtAuthGuard } from '../../infrustructure/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../infrustructure/auth/decorators/current-user.decorator';
import { SignUpUserDto } from '../dto/signup-user.dto';
import { LoginUserDto } from 'apps/authentication/src/application/dto/login-user.dto';





@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("signup")
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    // find user by email
    return await this.authService.sinupUser(signUpUserDto)
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.loginUser(loginUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: IAuthenticatedUser) {
    return user;
  }

}
