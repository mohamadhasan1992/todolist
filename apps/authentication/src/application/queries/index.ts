import { getMeQueryHandler } from "./get-me-query.handler";
import { GetUserByEmailHandler } from "./get-user-by-email-query.handle";



export const AuthQueryHandlers = [getMeQueryHandler, GetUserByEmailHandler]