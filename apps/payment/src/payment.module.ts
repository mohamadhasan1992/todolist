import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoListSchema } from './infrastructure/database/schemas/todoList.schema';
import { TodoItemSchema } from './infrastructure/database/schemas/todoItem.schema';
import { TodoListController } from './presentation/controllers/todoList.controller';
import { TodoItemController } from './presentation/controllers/todoItem.controller';
import { GetTodoListsHandler } from './application/queries/get-todoList-query.handler';
import { GetTodoItemsHandler } from './application/queries/get-todoItem-query.handler';
import { TodoListSchemaFactory } from './infrastructure/database/schema-factory/todoList-schema.factory';
import { TodoItemSchemaFactory } from './infrastructure/database/schema-factory/todoItem-schema.factory';
import { SchemaFactory } from '@nestjs/mongoose';
import { TodoItemEntityFactory } from './domain/entityFactory/TodoItemEntity.factory';
import { TodoListEntityFactory } from './domain/entityFactory/TodoListEntity.factory';
import { TodoCommandHandlers } from './application/commands';
import { TodoEventHandlers } from './domain/events';
import { TodoQueryHandlers } from './application/queries';
import * as Joi from 'joi';
import { TodoListCommandEntityRepository } from './infrastructure/repositories/todoList-command-entity.repository';
import { TodoListQueryEntityRepository } from './infrastructure/repositories/todoList-query-entity.repository';
import { TodoItemQueryEntityRepository } from './infrastructure/repositories/todoItem-query-entity.repository';
import { TodoItemCommandEntityRepository } from './infrastructure/repositories/todoItem-command-entity.repository';





@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_QUERY_URI: Joi.string().required(),
        MONGO_COMMAND_URI: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
      })
    }),
    CqrsModule,
    DatabaseModule.forRootAsync('command', {
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_QUERY_URI'),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule.forRootAsync('query', {
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_COMMAND_URI'),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule.forFeature([       
      { 
        name: "queryTodoList", 
        schema: SchemaFactory.createForClass(TodoListSchema) 
      },
      { 
        name: "queryTodoItem", 
        schema: SchemaFactory.createForClass(TodoItemSchema) 
      }
    ], 
    "query"
  ),
  DatabaseModule.forFeature([        
    { 
      name: "commandTodoList", 
      schema: SchemaFactory.createForClass(TodoListSchema) 
    },
    { 
      name: "commandTodoItem", 
      schema: SchemaFactory.createForClass(TodoItemSchema) 
    }
  ], 
  "command"
  ),
  ],
  controllers: [
    TodoListController, 
    TodoItemController
],
  providers: [
    { provide: 'TodoListCommandRepository', useClass: TodoListCommandEntityRepository },
    { provide: 'TodoListQueryRepository', useClass: TodoListQueryEntityRepository },
    { provide: 'TodoItemQueryRepository', useClass: TodoItemQueryEntityRepository },
    { provide: 'TodoItemCommandRepository', useClass: TodoItemCommandEntityRepository },
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
export class PaymentModule {}