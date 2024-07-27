import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { IAuthenticatedUser, LoginUserDto, SignUpUserDto } from '@app/common';
import { AuthService } from '../../application/services/auth.service';
import { JwtAuthGuard } from '../../infrustructure/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../infrustructure/auth/decorators/current-user.decorator';





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
