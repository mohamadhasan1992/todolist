export class TodoList {
    constructor(
      public readonly _id: string,
      public readonly label: string,
      public readonly user: string,
    ) {}
}