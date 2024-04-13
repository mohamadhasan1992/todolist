import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { PostgresDatabaseModule } from '@app/common';
import { TodolistEntity } from './db/todolist.entity';

@Module({
  imports: [PostgresDatabaseModule.forFeature([TodolistEntity])],
  controllers: [TodolistController],
  providers: [TodolistService],
  exports: [TodolistService]
})
export class TodolistModule {}
