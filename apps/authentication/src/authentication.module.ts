import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongodatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { RedisOptions } from '@app/common/config/redisOptions';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongodatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync(RedisOptions),
    UsersModule, 
    AuthModule
  ],
})
export class AuthenticationModule {}
