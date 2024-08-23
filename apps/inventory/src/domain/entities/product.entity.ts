import { AggregateRoot } from "@nestjs/cqrs";


export class Product extends AggregateRoot{
    constructor(
      private readonly _id: string,
      private label: string,
      private user: string,
      private price: number
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

    getPrice(): number{
      return this.price;
    }

    updateProduct(label: string, user: string, price: number) {
      this.user = user;
      this.label = label;
      this.price = price;

      return this;
    }


}