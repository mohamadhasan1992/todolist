import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchemaFactory } from '@nestjs/mongoose';
import { TodoQueryHandlers } from './application/queries';
import * as Joi from 'joi';
import { ProductSchema } from './infrastructure/database/schemas/product.schema';
import { ProductController } from './presentation/controllers/product.controller';
import { ProductCommandEntityRepository } from './infrastructure/repositories/product-command-entity.repository';
import { ProductQueryEntityRepository } from './infrastructure/repositories/product-query-entity.repository';
import { ProductSchemaFactory } from './infrastructure/database/schema-factory/product-schema.factory';
import { GetProductListHandler } from './application/queries/get-productList-query.handler';
import { ProductEntityFactory } from './domain/entityFactory/ProductEntity.factory';
import { ProductEventHandlers } from './domain/events';





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
        name: "queryProduct", 
        schema: SchemaFactory.createForClass(ProductSchema) 
      },
    ], 
    "query"
  ),
  DatabaseModule.forFeature([        
    { 
      name: "commandProduct", 
      schema: SchemaFactory.createForClass(ProductSchema) 
    },
  ], 
  "command"
  ),
  ],
  controllers: [
    ProductController
],
  providers: [
    { provide: 'ProductCommandRepository', useClass: ProductCommandEntityRepository },
    { provide: 'ProductQueryRepository', useClass: ProductQueryEntityRepository },
    ProductEntityFactory,
    ProductSchemaFactory,
    // ...TodoCommandHandlers,
    ...ProductEventHandlers,
    ...TodoQueryHandlers,
    GetProductListHandler,
  ],
})
export class InventoryModule {}