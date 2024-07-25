import { AggregateRoot } from "@nestjs/cqrs";


export class TodoList extends AggregateRoot{
    constructor(
      private readonly _id: string,
      private label: string,
      private user: string,
    ) {
      super()
    }

    getId(){
      return this._id
    }

    getLabel(): string{
      return this.label;
    }

    getUser(): string{
      return this.user;
    }

    updateTodoList(label: string, user: string){
      this.label = label;
      this.user = user;
    }

}