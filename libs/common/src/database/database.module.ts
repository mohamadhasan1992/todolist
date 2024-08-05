import { DynamicModule, Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class DatabaseModule {
  static forRootAsync(connectionName: string, options: { useFactory: (configService: ConfigService) => Promise<MongooseModuleOptions>, inject: any[] }): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: options.useFactory,
          inject: options.inject,
          connectionName: connectionName,
        }),
      ],
    };
  }

  static forFeature(models: ModelDefinition[], connectionName: string): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forFeature(models, connectionName),
      ],
    };
  }
}
