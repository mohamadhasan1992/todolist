import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IAuthenticatedUser } from '@app/common';
import { JwtAuthGuard } from '../../infrustructure/auth/guards/jwt-auth.guard';
import { TodoItemService } from '../../application/services/todo-item.service';
import { GatewayCreateTodoItemDto } from '../dto/gateway-create-todoItem.dto';
import { CurrentUser } from '../../infrustructure/auth/decorators/current-user.decorator';
import { GatewayUpdateTodoItemDto } from '../dto/gateway-update-todoItem.dto';



@Controller('todo-item')
@UseGuards(JwtAuthGuard)
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Get(":id")
  async getItemsByListId(
    @Param("id") todoListId: string,
  ){
    return await this.todoItemService.find(todoListId)
  }

  @Post()
  async create(
    @Body() createTodoItemDto: GatewayCreateTodoItemDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    const {description, priority, title, todoList} = createTodoItemDto;
    return await this.todoItemService.create({
      description, 
      priority, 
      title,
      todoList,
      user: user._id
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTodoItemDto: GatewayUpdateTodoItemDto,
    @CurrentUser() user: IAuthenticatedUser
  ) {
    const {description, priority, title, todoList} = updateTodoItemDto;
    return await this.todoItemService.update({
      description, 
      priority, 
      title, 
      todoList,
      id,
      user: user._id
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthenticatedUser
  
  ) {
    return await this.todoItemService.remove({
      id,
      user: user._id
    });
  }
}
