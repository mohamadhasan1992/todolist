import { AggregateRoot } from '@nestjs/cqrs';
import { FilterQuery, Types } from 'mongoose';
import { EntityRepository } from './entity.repository';

import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export abstract class BaseQueryEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> extends EntityRepository<TSchema, TEntity> {
  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ _id: new Types.ObjectId(id) } as FilterQuery<TSchema>);
  }

  async findOne(filterQuery: FilterQuery<TSchema>): Promise<TEntity>{
    return super.findOne(filterQuery);
  }

  async findAll(filterQuery: FilterQuery<TSchema>): Promise<TEntity[]> {
    return this.find(filterQuery);
  }
  
}
