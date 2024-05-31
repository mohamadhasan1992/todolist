import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseTodoListRepository } from './todo.repository';
import { TodoListSchema } from './todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'TodoList', schema: TodoListSchema }])],
  providers: [
    {
      provide: 'TodoListRepository',
      useClass: MongooseTodoListRepository,
    },
  ],
  exports: ['TodoListRepository'],
})
export class TodoListDatabaseModule {}