import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TODO_PACKAGE_NAME, TODO_SERVICE } from '@app/common';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '@app/common/config/redisOptions';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TODO_SERVICE,
        transport: Transport.GRPC,
        options: {
          url:"Todo:50052",
          package: TODO_PACKAGE_NAME,
          protoPath: join(__dirname, '../todo.proto'),
        },
      } 
    ]),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [TodolistController],
  providers: [TodolistService]
})
export class TodolistModule {}
