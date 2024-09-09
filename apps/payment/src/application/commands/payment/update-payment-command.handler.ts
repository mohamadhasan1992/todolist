import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePaymentCommand } from './update-payment.command';
import { InjectModel } from '@nestjs/mongoose';
import { IPaymentRepository } from 'apps/payment/src/domain/repositories/payment.repository.interface';






@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler implements ICommandHandler<UpdatePaymentCommand> {
  constructor(
    @InjectModel("PaymentRepository")
    private readonly paymentRepository: IPaymentRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ updatePaymentDto, id }: UpdatePaymentCommand): Promise<any> {
    const {quantity, user} = updatePaymentDto;

    const Payment = this.eventPublisher.mergeObjectContext(
      await this.paymentRepository.findOne({id} as any)
    );
    Payment.updatePayment(quantity, user);
    await this.paymentRepository.update(id, Payment)
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
