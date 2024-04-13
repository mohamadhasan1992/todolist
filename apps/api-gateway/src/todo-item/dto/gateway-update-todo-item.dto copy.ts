import { Priority } from "@app/common";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";




export class GatewayUpdateTodoItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;


    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(Priority)
    @IsNotEmpty()
    priority: Priority;
}