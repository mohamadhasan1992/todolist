import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateOrderCommand } from './update-order.command';
import { IOrderCommandRepository, IOrderQueryRepository } from 'apps/order/src/domain/repositories/order.repository.interface';




@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  constructor(
    @Inject("OrderCommandRepository")
    private readonly orderRepository: IOrderCommandRepository,
    @Inject("OrderQueryRepository")
    private readonly orderQueryRepository: IOrderQueryRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ updateOrderDto, id }: UpdateOrderCommand): Promise<any> {
    const {quantity, user, description} = updateOrderDto;

    const order = this.eventPublisher.mergeObjectContext(
      await this.orderQueryRepository.findOneById(id)
    );
    order.updateOrder(quantity, user, description);
    await this.orderRepository.findOneAndReplaceById(id, order)
    order.commit()
    // find todoItems
    return {
      id: order.getId(),
      quantity: order.getQuantity(),
      user: order.getUser(),
      description: order.getDescription(),
      message: "Order updated successfully!"
    }
  }
}
