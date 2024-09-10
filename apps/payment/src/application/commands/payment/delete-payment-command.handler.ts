import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { DeletePaymentCommand } from './delete-payment.command';
import { PaymentDeletedEvent } from 'apps/payment/src/domain/events/payment-deleted.event';
import { IPaymentRepository } from 'apps/payment/src/domain/repositories/payment.repository.interface';
import { Inject } from '@nestjs/common';




@CommandHandler(DeletePaymentCommand)
export class DeletePaymentHandler implements ICommandHandler<DeletePaymentCommand> {
  constructor(
    @Inject("PaymentRepository")
    private readonly paymentRepository: IPaymentRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ deletePaymentDto }: DeletePaymentCommand): Promise<any> {
    const { id } = deletePaymentDto;
    const Payment = await this.paymentRepository.findOne({ id } as any);
    if (!Payment) {
      throw new RpcException('Payment Not Found');
    }

    const PaymentContext = this.eventPublisher.mergeObjectContext(Payment);
    await this.paymentRepository.update(id, PaymentContext);
    PaymentContext.apply(new PaymentDeletedEvent(id));
    PaymentContext.commit();

    return { 
      id: Payment.getId(),
      quantity: Payment.getQuantity(),
      user: Payment.getUser(),
      message: 'Payment deleted successfully' 
    };
  }
}
