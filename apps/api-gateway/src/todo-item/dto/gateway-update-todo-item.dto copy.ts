import { IsNotEmpty, IsString } from "class-validator";




export class GatewayUpdateTodoItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;


    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    priority: string;
}