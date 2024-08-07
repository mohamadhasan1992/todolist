import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoListDeletedEvent } from "./todoList-deleted.event";





@EventsHandler(TodoListDeletedEvent)
export class TodoListDeletedHandler implements IEventHandler<TodoListDeletedEvent>{
    
    
    async handle({ id }: TodoListDeletedEvent): Promise<void> {
        console.log("todoList deleted event", id)
    }
}