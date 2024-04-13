import { GetMeDto, GetMeUserResponse, IAuthenticatedUser, LoginUserDto, SignUpUserDto, User, compareHash, hashData } from '@app/common';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UserDocument } from '../users/entities/user.schema';





@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ){}



  async signUpUser(signUpUserDto: SignUpUserDto){
 
    try{
      const newUser = await this.userService.create(signUpUserDto)
      return {
        message: newUser.name + " signed  Up successfully, please navigate to login page!",
      };
    }catch(err){
      throw new RpcException({code: 400, message: "SignUp Failed!"})
    }
  }

  async logUserIn(loginUserDto: LoginUserDto){
    console.log("loginUserDto", loginUserDto);
    const user = await this.userService.findOne({email: loginUserDto.email});
    if(!user){
      throw new RpcException("Enter Credentials correctly!");
    }

    const isPasswordValid = await compareHash(loginUserDto.password, user.password);
    if(isPasswordValid){
      const token = await this.getToken(user._id.toHexString());
      await this.cacheUser(user)
      return {
        message: "You are loggedin successfully!",
        token
      };
  
    }else{
      throw new RpcException("Enter Credentials correctly!")
    }

  }


  async getMe(getMeDto: GetMeDto){
    const {userId} = getMeDto;
    return (await this.userService.findById({Id: userId}) as unknown as GetMeUserResponse)
  }


  async getToken(userId: string){
    return await this.jwtService.signAsync(
      {userId},
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get("JWT_EXPIRES_IN"),
      }
    );
  }

  async cacheUser(user: UserDocument){
    return await this.cacheManager.set(user._id.toHexString(), JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
    }), 24 * 60 * 60 *1000)
  }



}
