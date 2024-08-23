import { AggregateRoot } from "@nestjs/cqrs";

export class TodoItem extends AggregateRoot{
    constructor(
      private _id: string,
      private title: string,
      private description: string,
      private priority: string,
      private todoList: string
    ) {
      super()
    }

    getId(): string{
      return this._id;
    }


    getTitle(): string{
      return this.title;
    }

    getDescription(): string{
      return this.description;
    }

    getPriority(): string{
      return this.priority;
    }

    getTodoList(): string{
      return this.todoList
    }

    updateDetails(
      title: string, 
      description: string, 
      priority: string): void{
        this.title = title;
        this.description = description;
        this.priority = priority;
    }

    
}