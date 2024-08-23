import { AggregateRoot } from "@nestjs/cqrs";


export class Payment extends AggregateRoot{
    constructor(
      private readonly _id: string,
      private user: string,
      private quantity: number,
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


    getCreatedAt(): Date{
      return this.createdAt;
    }

    setCreatedAt(): Date{
      const now = new Date(Date.now());
      this.createdAt = now;
      return this.createdAt;
    }

    updatePayment(quantity: number, user: string): Payment{
      this.quantity = quantity;
      this.user = user;
      return this
    }


}