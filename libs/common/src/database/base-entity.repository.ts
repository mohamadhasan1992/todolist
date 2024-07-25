import { AggregateRoot } from '@nestjs/cqrs';
import { FilterQuery, Types } from 'mongoose';
import { EntityRepository } from './entity.repository';

import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export abstract class BaseEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> extends EntityRepository<TSchema, TEntity> {
  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ _id: new Types.ObjectId(id) } as FilterQuery<TSchema>);
  }

  async findOne(filterQuery: FilterQuery<TSchema>): Promise<TEntity>{
    return super.findOne(filterQuery);
  }

  async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
    return await this.findOneAndReplace(
      { _id: new Types.ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findAll(filterQuery: FilterQuery<TSchema>): Promise<TEntity[]> {
    return this.find(filterQuery);
  }

  async delete(entityFilterQuery: FilterQuery<TSchema>): Promise<void> {
    await this.entityModel.findOneAndDelete(entityFilterQuery).exec();

  }
}
