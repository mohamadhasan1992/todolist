export class CreateTodoListCommand {
    constructor(
      public readonly label: string,
      public readonly user: string,
    ) {}
}
  
