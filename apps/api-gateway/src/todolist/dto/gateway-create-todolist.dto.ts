import { IsNotEmpty, IsString } from "@nestjs/class-validator";


export class GatewayCreateTodoListDto{
    @IsString()
    @IsNotEmpty()
    label: string;
}