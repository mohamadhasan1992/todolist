import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            replication: {
              master: {
                host: configService.get<string>('DB_MASTER_HOST'),
                port: configService.get<number>('DB_MASTER_PORT'),
                username: configService.get<string>('DB_MASTER_USER'),
                password: configService.get<string>('DB_MASTER_PASSWORD'),
                database: configService.get<string>('DB_MASTER_NAME'),
              },
              slaves: [
                {
                  host: configService.get<string>('DB_SLAVE1_HOST'),
                  port: parseInt(configService.get<string>('DB_SLAVE1_PORT'), 10),
                  username: configService.get<string>('DB_SLAVE1_USER'),
                  password: configService.get<string>('DB_SLAVE1_PASSWORD'),
                  database: configService.get<string>('DB_SLAVE1_NAME'),
                },
                {
                  host: configService.get<string>('DB_SLAVE2_HOST'),
                  port: parseInt(configService.get<string>('DB_SLAVE2_PORT'), 10),
                  username: configService.get<string>('DB_SLAVE2_USER'),
                  password: configService.get<string>('DB_SLAVE2_PASSWORD'),
                  database: configService.get<string>('DB_SLAVE2_NAME'),
                },
              ],
            },
            autoLoadEntities: true,
            synchronize: true,  
          }),
        }),
      ],
    })
export class PostgresDatabaseModule {
    static forFeature(entities: EntityClassOrSchema[]){
        return TypeOrmModule.forFeature(entities)
        
    }
}

