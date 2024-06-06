import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TodoListDocument, TodoListSchema } from './infrastructure/database/schemas/todoList.schema';
import { TodoItemDocument, TodoItemSchema } from './infrastructure/database/schemas/todoItem.schema';
import { TodoListController } from './infrastructure/controllers/todoList.controller';
import { TodoItemController } from './infrastructure/controllers/todoItem.controller';
import { MongooseTodoListRepository } from './infrastructure/repositories/todoList.repository';
import { MongooseTodoItemRepository } from './infrastructure/repositories/todoItem.repository';
import { CreateTodoListHandler } from './application/commands/create-todoList-command.handler';
import { CreateTodoItemHandler } from './application/commands/create-todoItem-command.handler';
import { GetTodoListsHandler } from './application/queries/get-todoList-query.handler';
import { GetTodoItemsHandler } from './application/queries/get-todoItem-query.handler';





@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    DatabaseModule,
    MongooseModule.forFeature([
        { 
            name: TodoListDocument.name, 
            schema: TodoListSchema 
        },
        { 
            name: TodoItemDocument.name, 
            schema: TodoItemSchema 
        },
    ]),
  ],
  controllers: [
    TodoListController, 
    TodoItemController
],
  providers: [
    MongooseTodoListRepository,
    MongooseTodoItemRepository,
    CreateTodoListHandler,
    CreateTodoItemHandler,
    GetTodoListsHandler,
    GetTodoItemsHandler,
    {
      provide: 'ITodoListRepository',
      useClass: MongooseTodoListRepository,
    },
    {
      provide: 'ITodoItemRepository',
      useClass: MongooseTodoItemRepository,
    },
  ],
})
export class TodoModule {}