import { PaymentCreatedEvent } from "./payment-created.event";
import { PaymentDeletedEvent } from "./payment-deleted.event";


export const PaymentEventHandlers = [
    PaymentCreatedEvent,
    PaymentDeletedEvent,
];