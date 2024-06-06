export class TodoItem {
    constructor(
      public readonly _id: string,
      public readonly title: string,
      public readonly description: string,
      public readonly priority: string,
    ) {}
}