import { OrderCreatedEvent } from "./order-created.event";
import { OrderDeletedEvent } from "./order-deleted.event";


export const OrderEventHandlers = [
    OrderCreatedEvent,
    OrderDeletedEvent,
];