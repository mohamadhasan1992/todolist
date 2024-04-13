import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RedisOptions } from '@app/common/config/redisOptions';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodolistModule } from './todolist/todolist.module';
import { TodoItemModule } from './todo-item/todo-item.module';
import { JwtModule } from '@nestjs/jwt';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: async(configService: ConfigService) => ({
        import: [ConfigModule],
        secret: configService.getOrThrow<string>("JWT_SECRET"),
        signOptions: { expiresIn:  configService.getOrThrow<string>("JWT_EXPIRES_IN")}
      }),
      inject: [ConfigService]
    }),    CacheModule.registerAsync(RedisOptions),
    AuthModule,
    TodolistModule,
    TodoItemModule,
  ],
})
export class ApiGatewayModule {}
