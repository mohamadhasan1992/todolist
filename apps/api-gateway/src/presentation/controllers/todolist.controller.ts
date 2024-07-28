import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import {  IAuthenticatedUser } from '@app/common';
import { JwtAuthGuard } from '../../infrustructure/auth/guards/jwt-auth.guard';
import { TodolistService } from '../../application/services/todolist.service';
import { CurrentUser } from '../../infrustructure/auth/decorators/current-user.decorator';
import { GatewayCreateTodoListDto } from '../dto/gateway-create-todolist.dto';
import { GatewayUpdateTodoListDto } from '../dto/gateway-update-todolist.dto';



@Controller('todolist')
@UseGuards(JwtAuthGuard)
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post()
  async create(
    @CurrentUser() user: IAuthenticatedUser,
    @Body() {label}: GatewayCreateTodoListDto
  ) {
    return await this.todolistService.create({
      user: user._id,
      label
    });
  }

  @Get()
  async findMyTodolists(
    @CurrentUser() user: IAuthenticatedUser,
  ) {
    return await this.todolistService.findAll(
      {userId: user._id}
    );
  }


  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTodolistDto: GatewayUpdateTodoListDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    const {
      label
    } = updateTodolistDto;
    return await this.todolistService.update({
      id,
      user: user._id,
      label
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    return await this.todolistService.remove({
      id,
      user: user._id
    });
  }
}
