import { IsNotEmpty, IsString } from "class-validator";




export class GatewayUpdateTodoListDto {
    @IsString()
    @IsNotEmpty()
    label: string;
}