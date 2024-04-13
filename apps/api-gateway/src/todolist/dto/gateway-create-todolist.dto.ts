import { IsString } from "@nestjs/class-validator";
import { IsNotEmpty } from "class-validator";



export class GatewayCreateTodoListDto{
    @IsString()
    @IsNotEmpty()
    label: string;
    
}