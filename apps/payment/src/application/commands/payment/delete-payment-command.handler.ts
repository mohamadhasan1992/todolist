import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { DeletePaymentCommand } from './delete-payment.command';
import { IPaymentCommandRepository, IPaymentQueryRepository } from 'apps/payment/src/domain/repositories/payment.repository.interface';
import { PaymentDeletedEvent } from 'apps/payment/src/domain/events/payment-deleted.event';




@CommandHandler(DeletePaymentCommand)
export class DeletePaymentHandler implements ICommandHandler<DeletePaymentCommand> {
  constructor(
    @Inject("PaymentCommandRepository")
    private readonly paymentRepository: IPaymentCommandRepository,
    @Inject("PaymentQueryRepository")
    private readonly paymentQueryRepository: IPaymentQueryRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ deletePaymentDto }: DeletePaymentCommand): Promise<any> {
    const { id } = deletePaymentDto;
    const Payment = await this.paymentQueryRepository.findOneById(id);
    if (!Payment) {
      throw new RpcException('Payment Not Found');
    }

    const PaymentContext = this.eventPublisher.mergeObjectContext(Payment);
    await this.paymentRepository.delete(id);
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
