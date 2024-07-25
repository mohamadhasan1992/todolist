import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TodoList } from '../../domain/entities/todo.entity';
import { GetTodoListsQuery } from '../../application/queries/get-todoList-query';
import { CreateTodoListDto } from '../../application/dto/todoList/CreateTodoList.dto';
import { CreateTodoListCommand } from '../../application/commands/todoList/create-todoList.command';
import { CommandTodoListResponse, DeleteResponse, DeleteTodoListDto, TodoCommandServiceController, TodoCommandServiceControllerMethods, UpdateTodoListDto } from '@app/common';
import { Payload } from '@nestjs/microservices';
import { UpdateTodoListCommand } from '../../application/commands/todoList/update-todoList.command';
import { DeleteTodoListCommand } from '../../application/commands/todoList/delete-todoList.command';





@Controller()
@TodoCommandServiceControllerMethods()
export class TodoListController implements TodoCommandServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


  async createTodoList(
    @Payload() createTodoListDto: CreateTodoListDto,
  ): Promise<CommandTodoListResponse> {
    console.log("createTodoListDto", createTodoListDto)
    return await this.commandBus.execute(new CreateTodoListCommand(createTodoListDto));
  }


  async updateTodoList(
    @Payload() updateTodoListDto: UpdateTodoListDto,
  ): Promise<CommandTodoListResponse> {
    return await this.commandBus.execute(new UpdateTodoListCommand(updateTodoListDto));
  }


  async deleteTodoList(
    @Payload() deleteTodoListDto: DeleteTodoListDto,
  ): Promise<DeleteResponse> {

    return await this.commandBus.execute(new DeleteTodoListCommand(deleteTodoListDto));
  }

}