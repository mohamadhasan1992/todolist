import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoListCreatedEvent } from "./todoList-created.event";




@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedHandler implements IEventHandler<TodoListCreatedEvent>{
    
    
    async handle({ todoListId }: TodoListCreatedEvent): Promise<void> {
        console.log("todoList created event", todoListId)
    }
}