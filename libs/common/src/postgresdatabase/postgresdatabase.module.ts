import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async(configService: ConfigService) => ({
                type: "postgres",
                host: configService.getOrThrow<string>("PG_HOST"),
                port: configService.getOrThrow<number>("PG_PORT"),
                username: configService.getOrThrow<string>("PG_USERNAME"),
                password: configService.getOrThrow<string>("PG_PASSWORD"),
                database: configService.getOrThrow<string>("PG_DATABASE"),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow<boolean>("PG_SYNCHRONIZE")
            }),
            inject: [ConfigService]
        }),
        ]
})
export class PostgresDatabaseModule {
    static forFeature(entities: EntityClassOrSchema[]){
        return TypeOrmModule.forFeature(entities)
        
    }
}

