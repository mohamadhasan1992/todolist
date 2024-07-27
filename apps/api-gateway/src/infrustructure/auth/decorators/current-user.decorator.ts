import { IAuthenticatedUser } from "@app/common";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";



const getCurrentUserByContext = (context: ExecutionContext): IAuthenticatedUser => {
    return context.switchToHttp().getRequest()?.user;
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
)