import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TodoListSchema } from './infrastructure/database/schemas/todoList.schema';
import { TodoItemSchema } from './infrastructure/database/schemas/todoItem.schema';
import { TodoListController } from './presentation/controllers/todoList.controller';
import { TodoItemController } from './presentation/controllers/todoItem.controller';
import { GetTodoListsHandler } from './application/queries/get-todoList-query.handler';
import { GetTodoItemsHandler } from './application/queries/get-todoItem-query.handler';
import { TodoListEntityRepository } from './infrastructure/repositories/todoList-entity.repository';
import { TodoItemEntityRepository } from './infrastructure/repositories/todoItem-entity.repository';
import { TodoListSchemaFactory } from './infrastructure/database/schema-factory/todoList-schema.factory';
import { TodoItemSchemaFactory } from './infrastructure/database/schema-factory/todoItem-schema.factory';
import { SchemaFactory } from '@nestjs/mongoose';
import { TodoItemEntityFactory } from './domain/entityFactory/TodoItemEntity.factory';
import { TodoListEntityFactory } from './domain/entityFactory/TodoListEntity.factory';
import { TodoCommandHandlers } from './application/commands';
import { TodoEventHandlers } from './domain/events';
import { TodoQueryHandlers } from './application/queries';





@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    DatabaseModule,
    DatabaseModule.forFeature([
        { 
            name: TodoListSchema.name, 
            schema: SchemaFactory.createForClass(TodoListSchema) 
        },
        { 
            name: TodoItemSchema.name, 
            schema: SchemaFactory.createForClass(TodoItemSchema) 
        }
    ]),
  ],
  controllers: [
    TodoListController, 
    TodoItemController
],
  providers: [
    { provide: 'TodoListRepository', useClass: TodoListEntityRepository },
    { provide: 'TodoItemRepository', useClass: TodoItemEntityRepository },
    TodoListEntityFactory,
    TodoItemEntityFactory,
    TodoListSchemaFactory,
    TodoItemSchemaFactory,
    ...TodoCommandHandlers,
    ...TodoEventHandlers,
    ...TodoQueryHandlers,
    GetTodoListsHandler,
    GetTodoItemsHandler,
  ],
})
export class TodoModule {}