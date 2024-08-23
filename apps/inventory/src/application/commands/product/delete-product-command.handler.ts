import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { DeleteProductCommand } from './delete-product.command';
import { IProductCommandRepository, IProductQueryRepository } from '@apps/inventory/domain/repositories/product.repository.interface';
import { ProductDeletedEvent } from '@apps/inventory/domain/events/product-deleted.event';




@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(
    @Inject("ProductCommandRepository")
    private readonly ProductRepository: IProductCommandRepository,
    @Inject("ProductQueryRepository")
    private readonly ProductQueryRepository: IProductQueryRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute({ deleteProductDto }: DeleteProductCommand): Promise<any> {
    const { id } = deleteProductDto;
    const product = await this.ProductQueryRepository.findOneById(id);
    if (!product) {
      throw new RpcException('Product Not Found');
    }

    const ProductContext = this.eventPublisher.mergeObjectContext(product);
    await this.ProductRepository.delete(id);
    ProductContext.apply(new ProductDeletedEvent(id));
    ProductContext.commit();

    return { 
      id: product.getId(),
      label: product.getLabel(),
      user: product.getUser(),
      price: product.getPrice(),
      message: 'Product deleted successfully' 
    };
  }
}
