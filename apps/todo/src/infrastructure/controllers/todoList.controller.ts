import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListDto } from '../../application/dto/todoList/CreateTodoList.dto';
import { CreateTodoListCommand } from '../../application/commands/todoList/create-todoList.command';
import { CommandTodoListResponse, DeleteResponse, DeleteTodoListDto, FindMyTodoListDto, TodoLists, TodoServiceController, TodoServiceControllerMethods, UpdateTodoListDto } from '@app/common';
import { Payload } from '@nestjs/microservices';
import { UpdateTodoListCommand } from '../../application/commands/todoList/update-todoList.command';
import { DeleteTodoListCommand } from '../../application/commands/todoList/delete-todoList.command';
import { GetTodoListsQuery } from '../../application/queries/get-todoList-query';
import { TodoList } from '../../domain/entities/todo.entity';





@Controller()
@TodoServiceControllerMethods()
export class TodoListController implements TodoServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async findTodoList(
    @Payload() findMyTodoListDto: FindMyTodoListDto
  ): Promise<TodoLists>{
    const { userId } = findMyTodoListDto;
    const todolists = await this.queryBus.execute(
      new GetTodoListsQuery(userId)
    )
    return {
      todolists: todolists.map((todoList: TodoList) => ({
        ...todoList,
        id: todoList.getId()
      })) 
    }
  }

  async createTodoList(
    @Payload() createTodoListDto: CreateTodoListDto,
  ): Promise<CommandTodoListResponse> {
    return await this.commandBus.execute(new CreateTodoListCommand(createTodoListDto));
  }


  async updateTodoList(
    @Payload() updateTodoListDto: UpdateTodoListDto,
  ): Promise<CommandTodoListResponse> {
    console.log("updateTodoListDto", updateTodoListDto)
    return await this.commandBus.execute(new UpdateTodoListCommand(updateTodoListDto));
  }


  async deleteTodoList(
    @Payload() deleteTodoListDto: DeleteTodoListDto,
  ): Promise<DeleteResponse> {

    return await this.commandBus.execute(new DeleteTodoListCommand(deleteTodoListDto));
  }

}