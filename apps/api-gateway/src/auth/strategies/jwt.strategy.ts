import { Injectable, ForbiddenException, UnauthorizedException, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { IAuthenticatedUser, UserTokenPayload } from "@app/common";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { AuthService } from "../auth.service";



@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        private readonly configService: ConfigService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly authService: AuthService
    ){
        super({
            jwtFromRequest:  ExtractJwt.fromExtractors([
                (request: any) => request?.cookies?.Authentication || request?.Authentication || this.extractTokenFromHeader(request)
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>("JWT_SECRET")
        })
    }


    async validate({userId}: UserTokenPayload){
        if(!userId){
            throw new UnauthorizedException("unAuthenticated! please login first!")
        }
        // check for cached
        const cachedUser: string = await this.cacheManager.get(userId);
        if(cachedUser){
            return cachedUser
        }
        // if user not found check for direct request user
        const user = this.authService.getMe({userId})
        if(user){
            return user
        }else{
            throw new UnauthorizedException("unAuthenticated! please login first!")
        }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }

}

