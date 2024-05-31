import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { url } from 'inspector';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        uri: configService.getOrThrow<string>("MONGO_URI")
      }),
      inject: [ConfigService]
    }),
  ],
})
export class DatabaseModule {}
