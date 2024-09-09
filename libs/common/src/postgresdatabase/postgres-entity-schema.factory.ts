import { AggregateRoot } from '@nestjs/cqrs';

import { PostgresAbstractDocument } from './postgres-abstract.entity';

export interface PostgresEntitySchemaFactory<
  TSchema extends PostgresAbstractDocument,
  TEntity extends AggregateRoot
> {
  create(entity: TEntity): TSchema;
  createFromEntity(entitySchema: TSchema): TEntity;
}
