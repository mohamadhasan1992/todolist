import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePaymentCommand } from './update-payment.command';
import { IPaymentCommandRepository, IPaymentQueryRepository } from 'apps/payment/src/domain/repositories/payment.repository.interface';






@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler implements ICommandHandler<UpdatePaymentCommand> {
  constructor(
    @Inject("PaymentCommandRepository")
    private readonly paymentRepository: IPaymentCommandRepository,
    @Inject("PaymentQueryRepository")
    private readonly paymentQueryRepository: IPaymentQueryRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ updatePaymentDto, id }: UpdatePaymentCommand): Promise<any> {
    const {quantity, user} = updatePaymentDto;

    const Payment = this.eventPublisher.mergeObjectContext(
      await this.paymentQueryRepository.findOneById(id)
    );
    Payment.updatePayment(quantity, user);
    await this.paymentRepository.findOneAndReplaceById(id, Payment)
    Payment.commit()
    // find todoItems
    return {
      id: Payment.getId(),
      quantity: Payment.getQuantity(),
      user: Payment.getUser(),
      message: "Payment updated successfully!"
    }
  }
}
