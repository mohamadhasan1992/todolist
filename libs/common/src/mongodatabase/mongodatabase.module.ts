import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({ 
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow<string>("MONGO_URI")
            }),
            inject: [ConfigService]
    })]
})
export class MongodatabaseModule {
    static forFeature(models: ModelDefinition[]){
        return MongooseModule.forFeature(models)
    }
}
