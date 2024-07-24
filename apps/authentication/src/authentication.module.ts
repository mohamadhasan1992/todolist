import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisOptions } from '@app/common/config/redisOptions';
import { CacheModule } from '@nestjs/cache-manager';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@app/common/database/database.module';
import { UserSchema } from './infrustructure/database/schema/user.schema';
import { SchemaFactory } from '@nestjs/mongoose';
import { AuthController } from './infrustructure/controller/auth.controller';
import { UserEntityRepository } from './infrustructure/repositories/user-entity.repository';
import { UserEntityFactory } from './domain/entityFactory/UserEntity.factory';
import { AuthCommandHandlers } from './application/commands';
import { UserSchemaFactory } from './infrustructure/database/schema-factory/user-schema.factory';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema)
      }
    ]),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [AuthController],
  providers: [
    UserEntityRepository,
    UserEntityFactory,
    UserSchemaFactory,
    ...AuthCommandHandlers,

  ]
})
export class AuthenticationModule {}
