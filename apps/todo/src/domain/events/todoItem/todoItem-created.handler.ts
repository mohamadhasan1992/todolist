import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoItemCreatedEvent } from "./todoItem-created.event";




@EventsHandler(TodoItemCreatedEvent)
export class TodoItemCreatedHandler implements IEventHandler<TodoItemCreatedEvent>{
    
    
    async handle({ todoItemId }: TodoItemCreatedEvent): Promise<void> {
        console.log("todoItem created event", todoItemId)
    }
}