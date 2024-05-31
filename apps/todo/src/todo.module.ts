import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoListController } from './presentation/todoList/todoList.controller';
import { TodoListApplicationModule } from './application/todoList/todoList.module';
import { DatabaseModule } from '@app/common/database/database.module';



@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TodoListApplicationModule
  ],
  controllers: [TodoListController]
})
export class TodoModule {}
// src/app.module.ts
