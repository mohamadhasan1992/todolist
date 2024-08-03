import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisOptions } from '@app/common/config/redisOptions';
import { CacheModule } from '@nestjs/cache-manager';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@app/common/database/database.module';
import { UserSchema } from './infrustructure/database/schema/user.schema';
import { SchemaFactory } from '@nestjs/mongoose';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserEntityRepository } from './infrustructure/repositories/user-entity.repository';
import { UserEntityFactory } from './domain/entityFactory/UserEntity.factory';
import { AuthCommandHandlers } from './application/commands';
import { UserSchemaFactory } from './infrustructure/database/schema-factory/user-schema.factory';
import { AuthService } from './application/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthQueryHandlers } from './application/queries';




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
    }),
    CqrsModule,
    DatabaseModule.forRoot('primary'),
    DatabaseModule.forRoot('secondary'),
    DatabaseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema)
      },
    ], "primary"),
    DatabaseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema)
      },
    ], "secondary"),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {provide: "UserRepository", useClass: UserEntityRepository},
    UserEntityFactory,
    UserSchemaFactory,
    ...AuthCommandHandlers,
    ...AuthQueryHandlers

  ]
})
export class AuthenticationModule {}
