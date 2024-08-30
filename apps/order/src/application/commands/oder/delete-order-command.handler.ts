import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { DeleteOrderCommand } from './delete-order.command';
import { IOrderCommandRepository, IOrderQueryRepository } from 'apps/order/src/domain/repositories/order.repository.interface';
import { OrderDeletedEvent } from 'apps/order/src/domain/events/order-deleted.event';




@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  constructor(
    @Inject("OrderCommandRepository")
    private readonly orderRepository: IOrderCommandRepository,
    @Inject("OrderQueryRepository")
    private readonly orderQueryRepository: IOrderQueryRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ deleteOrderDto }: DeleteOrderCommand): Promise<any> {
    const { id } = deleteOrderDto;
    const Order = await this.orderQueryRepository.findOneById(id);
    if (!Order) {
      throw new RpcException('Order Not Found');
    }

    const OrderContext = this.eventPublisher.mergeObjectContext(Order);
    await this.orderRepository.findOneByIdAndDelete(id, OrderContext);
    OrderContext.apply(new OrderDeletedEvent(id));
    OrderContext.commit();

    return { 
      id: Order.getId(),
      quantity: Order.getQuantity(),
      user: Order.getUser(),
      describe: Order.getDescription(),
      message: 'Order deleted successfully' 
    };
  }
}
