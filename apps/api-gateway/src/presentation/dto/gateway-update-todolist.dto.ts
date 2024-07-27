import { PartialType } from "@nestjs/mapped-types";
import { GatewayCreateTodoListDto } from "./gateway-create-todolist.dto";


export class GatewayUpdateTodoListDto extends PartialType(GatewayCreateTodoListDto){}