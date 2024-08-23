import { AggregateRoot } from "@nestjs/cqrs";


export class Order extends AggregateRoot{
    constructor(
      private readonly _id: string,
      private quantity: number,
      private user: string,
      private description: string,
      private createdAt: Date
    ) {
      super()
    }

    getId(){
      return this._id
    }

    getQuantity(): number{
      return this.quantity;
    }

    getUser(): string{
      return this.user;
    }

    getDescription(): string{
      return this.description;
    }

    getCreatedAt(): Date{
      return this.createdAt;
    }

    setCreatedAt(): Date{
      const now = new Date(Date.now());
      this.createdAt = now;
      return this.createdAt;
    }

    updateOrder(quantity: number, user: string, description: string): Order{
      this.quantity = quantity;
      this.user = user;
      this.description = description;
      return this
    }


}