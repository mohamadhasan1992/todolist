import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProductCommand } from './update-product.command';
import { IProductCommandRepository, IProductQueryRepository } from '@apps/inventory/domain/repositories/product.repository.interface';




@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    @Inject("ProductCommandRepository")
    private readonly ProductRepository: IProductCommandRepository,
    @Inject("ProductQueryRepository")
    private readonly ProductQueryRepository: IProductQueryRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ updateProductDto, id }: UpdateProductCommand): Promise<any> {
    const {price, label, user, quantity} = updateProductDto;

    const product = this.eventPublisher.mergeObjectContext(
      await this.ProductQueryRepository.findOneById(id)
    );
    product.updateProduct(label, user, price, quantity);
    await this.ProductRepository.findOneAndReplaceById(id, product)
    product.commit()
    // find todoItems
    return {
      id: product.getId(),
      label: product.getLabel(),
      user: product.getUser(),
      price: product.getPrice(),
      message: "Todo List updated successfully!"
    }
  }
}
