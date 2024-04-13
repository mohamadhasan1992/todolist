import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { TodoItemController } from './todo-item.controller';
import { PostgresDatabaseModule } from '@app/common';
import { TodoItemEntity } from './db/todo-item.entity';
import { TodolistModule } from '../todolist/todolist.module';

@Module({
  imports: [
    PostgresDatabaseModule.forFeature([TodoItemEntity]),
    TodolistModule
  ],
  controllers: [TodoItemController],
  providers: [TodoItemService]
})
export class TodoItemModule {}
