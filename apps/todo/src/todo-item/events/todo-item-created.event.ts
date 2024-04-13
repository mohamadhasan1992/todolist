export class TodoItemCreatedEvent {
    constructor(
      public readonly todoItemId: number,
      public readonly todoListId: number,
    ) {}
}