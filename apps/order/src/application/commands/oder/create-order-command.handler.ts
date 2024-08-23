import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import { OrderEntityFactory } from 'apps/order/src/domain/entityFactory/OrderEntity.factory';




@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderFactory: OrderEntityFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ createOrderDto }: CreateOrderCommand): Promise<any> {
    const {quantity, user, description} = createOrderDto;

    const order = this.eventPublisher.mergeObjectContext(
      await this.orderFactory.create(quantity, user, description)
    );
    order.commit()
    return {
      message: "Todo list created successfully",
      id: order.getId(),
      user: order.getUser(),
      quantity: order.getQuantity(),
      description: order.getDescription()
    }
  }
}
