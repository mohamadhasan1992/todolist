import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE } from '@app/common';
import { join } from 'path';
import { UserJwtStrategy } from './strategies/jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '@app/common/config/redisOptions';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          url:"authentication:50051",
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto'),
        },
      } 
    ]),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserJwtStrategy]
})
export class AuthModule {}
