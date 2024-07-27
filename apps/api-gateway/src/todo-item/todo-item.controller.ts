import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { IAuthenticatedUser } from '@app/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GatewayCreateTodoItemDto } from './dto/gateway-create-todoItem.dto';
import { GatewayUpdateTodoItemDto } from './dto/gateway-update-todoItem.dto';



@Controller('todo-item')
@UseGuards(JwtAuthGuard)
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Get(":id")
  getItemsByListId(
    @Param("id") todoListId: string,
  ){
    return this.todoItemService.find(todoListId)
  }

  @Post()
  create(
    @Body() createTodoItemDto: GatewayCreateTodoItemDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    const {description, priority, title, todoList} = createTodoItemDto;
    return this.todoItemService.create({
      description, 
      priority, 
      title,
      todoList,
      user: user._id
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTodoItemDto: GatewayUpdateTodoItemDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    const {description, priority, title, todoList} = updateTodoItemDto;
    return this.todoItemService.update({
      description, 
      priority, 
      title, 
      todoList,
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
