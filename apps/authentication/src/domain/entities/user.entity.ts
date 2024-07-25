import { AggregateRoot } from "@nestjs/cqrs";

export class User extends AggregateRoot{
    constructor(
      private readonly _id: string,
      private name: string,
      private email: string,
      private password: string,
    ) {
      super()
    }

    getId(){
      return this._id
    }

    getName(): string{
      return this.name;
    }

    getEmail(): string{
      return this.email;
    }

    getPassword(): string{
      return this.password;
    }

    validatePassword(password: string): boolean{
      return this.password === password
    }


}