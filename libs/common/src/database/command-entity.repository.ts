import { AggregateRoot } from '@nestjs/cqrs';
import { FilterQuery, Types } from 'mongoose';
import { EntityRepository } from './entity.repository';

import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export abstract class BaseCommandEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> extends EntityRepository<TSchema, TEntity> {

  
  async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
    return await this.findOneAndReplace(
      { _id: new Types.ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async delete(entityFilterQuery: FilterQuery<TSchema>): Promise<void> {
    await this.entityModel.findOneAndDelete(entityFilterQuery).exec();
  }
}
