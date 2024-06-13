import { AggregateRoot } from "@nestjs/cqrs";

export class TodoItem extends AggregateRoot{
    constructor(
      private readonly _id: string,
      private readonly title: string,
      private readonly description: string,
      private readonly priority: string,
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
}