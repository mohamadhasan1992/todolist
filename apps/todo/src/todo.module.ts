import { Module } from '@nestjs/common';
import { TodoItemModule } from './todo-item/todo-item.module';
import { TodolistModule } from './todolist/todolist.module';
import { PostgresDatabaseModule } from '@app/common/postgresdatabase';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresDatabaseModule,
    TodolistModule, 
    TodoItemModule
  ],
})
export class TodoModule {}
