import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePaymentCommand } from './create-payment.command';
import { PaymentEntityFactory } from 'apps/payment/src/domain/entityFactory/PaymentEntity.factory';




@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler implements ICommandHandler<CreatePaymentCommand> {
  constructor(
    private readonly PaymentFactory: PaymentEntityFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ createPaymentDto }: CreatePaymentCommand): Promise<any> {
    const {quantity, user} = createPaymentDto;

    const Payment = this.eventPublisher.mergeObjectContext(
      await this.PaymentFactory.create(quantity, user)
    );
    Payment.commit()
    return {
      message: "Payment created successfully",
      id: Payment.getId(),
      user: Payment.getUser(),
      quantity: Payment.getQuantity(),
    }
  }
}
