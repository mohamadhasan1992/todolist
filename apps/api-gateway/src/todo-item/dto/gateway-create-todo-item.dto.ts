import { Priority } from "@app/common";
import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";
import { IsEnum } from "class-validator";


export class GatewayCreateTodoItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;


    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(Priority)
    @IsNotEmpty()
    priority: Priority;


    @IsNumber()
    @IsNotEmpty()
    todoList: number;
}