import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({})
export class PostgresDatabaseModule {
  static forRootAsync(options: {
    imports?: any[];
    inject?: any[];
    useFactory: (...args: any[]) => Promise<any> | any;
  }): DynamicModule {
    return {
      module: PostgresDatabaseModule,
      imports: [
        ...options.imports, // Allow external modules to be imported (e.g., ConfigModule)
        TypeOrmModule.forRootAsync({
          inject: options.inject,
          useFactory: options.useFactory,  // Dynamic config from the useFactory function
        }),
      ],
    };
  }

  static forFeature(entities: EntityClassOrSchema[]): DynamicModule {
    return TypeOrmModule.forFeature(entities);
  }
}
