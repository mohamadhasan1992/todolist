import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { IAuthenticatedUser } from '@app/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GatewayCreateTodoItemDto } from './dto/gateway-create-todo-item.dto';
import { GatewayUpdateTodoItemDto } from './dto/gateway-update-todo-item.dto copy';



@Controller('todo-item')
@UseGuards(JwtAuthGuard)
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}


  @Post()
  create(
    @Body() createTodoItemDto: GatewayCreateTodoItemDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    return this.todoItemService.create({
      ...createTodoItemDto,
      user: user._id
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTodoItemDto: GatewayUpdateTodoItemDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    return this.todoItemService.update({
      ...updateTodoItemDto,
      id,
      user: user._id
    });
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthenticatedUser
  
  ) {
    return this.todoItemService.remove({
      id,
      user: user._id
    });
  }
}
