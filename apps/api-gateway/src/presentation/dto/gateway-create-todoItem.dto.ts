import { IsNotEmpty, IsString } from "@nestjs/class-validator";


export class GatewayCreateTodoItemDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    priority: string;

    @IsString()
    @IsNotEmpty()
    todoList: string;

}