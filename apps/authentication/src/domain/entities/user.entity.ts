import { compareHash, hashData } from "@app/common";
import { AggregateRoot } from "@nestjs/cqrs";
import * as bcrypt from "bcryptjs";


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

    async validatePassword(password: string): Promise<boolean>{
      return await compareHash(password, this.password)
    }

    public async setPassword(password: string) {
      const hashedPass = await hashData(password);
      this.password = hashedPass;
      return this;
    }

}