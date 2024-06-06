import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import {  IAuthenticatedUser } from '@app/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GatewayCreateTodoListDto } from './dto/gateway-create-todolist.dto';
import { GatewayUpdateTodoListDto } from './dto/gateway-update-todolist.dto';



@Controller('todolist')
@UseGuards(JwtAuthGuard)
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post()
  create(
    @CurrentUser() user: IAuthenticatedUser,
    @Body() {label}: GatewayCreateTodoListDto
  ) {
    return this.todolistService.create({
      user: user._id,
      label
    });
  }

  @Get()
  findMyTodolists(
    @CurrentUser() user: IAuthenticatedUser,
  ) {
    return this.todolistService.findAll(
      {userId: user._id}
    );
  }


  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTodolistDto: GatewayUpdateTodoListDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    return this.todolistService.update({
      id,
      user: user._id,
      ...updateTodolistDto
    });
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    return this.todolistService.remove({
      id,
      user: user._id
    });
  }
}
