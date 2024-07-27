import { PartialType } from "@nestjs/mapped-types";
import { GatewayCreateTodoItemDto } from "./gateway-create-todoItem.dto";


export class GatewayUpdateTodoItemDto extends PartialType(GatewayCreateTodoItemDto){}