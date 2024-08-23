import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { ProductEntityFactory } from '@apps/inventory/domain/entityFactory/ProductEntity.factory';




@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    private readonly productFactory: ProductEntityFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ createProductDto }: CreateProductCommand): Promise<any> {
    const {label, user, price, quantity} = createProductDto;

    const product = this.eventPublisher.mergeObjectContext(
      await this.productFactory.create(label, user, price, quantity)
    );
    product.commit()
    return {
      message: "Todo list created successfully",
      id: product.getId(),
      user: product.getUser(),
      label: product.getLabel(),
      price: product.getPrice(),
      quantity: product.getQuantity()
    }
  }
}
