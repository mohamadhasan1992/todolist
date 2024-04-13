import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { TodolistService } from './todolist.service';
import { CreateTodoListDto, DeleteTodoListDto, FindMyTodoListDto, TodoServiceController, TodoServiceControllerMethods, UpdateTodoListDto } from '@app/common';



@Controller()
@TodoServiceControllerMethods()
export class TodolistController implements TodoServiceController {
  constructor(private readonly todolistService: TodolistService) {}

  createTodoList(@Payload() createTodolistDto: CreateTodoListDto) {
    return this.todolistService.create(createTodolistDto);
  }

  async findTodoList(@Payload() findMyTodoListDto: FindMyTodoListDto) {
    const todolists = await this.todolistService.findAll(findMyTodoListDto);
    return {todolists}
  }

  updateTodoList(@Payload() updateTodolistDto: UpdateTodoListDto) {
    return this.todolistService.update(updateTodolistDto.id, updateTodolistDto);
  }

  deleteTodoList(@Payload() deleteTodoListDto: DeleteTodoListDto) {
    return this.todolistService.remove(deleteTodoListDto);
  }
}
