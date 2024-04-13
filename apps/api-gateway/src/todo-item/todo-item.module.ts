import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { TodoItemController } from './todo-item.controller';
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
  controllers: [TodoItemController],
  providers: [TodoItemService]
})
export class TodoItemModule {}
