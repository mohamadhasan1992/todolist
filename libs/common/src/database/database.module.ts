import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions, ModelDefinition } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule],
})
export class DatabaseModule {
  static forRoot(connectionName: string): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
            const uri = configService.get<string>(`MONGO_${connectionName.toUpperCase()}_URI`);

            return {
              uri,
              connectionName,
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }

  static forFeature(models: ModelDefinition[], connectionName: string) {
    return MongooseModule.forFeature(models, connectionName);
  }
}
