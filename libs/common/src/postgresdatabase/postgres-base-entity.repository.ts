import { FindOneOptions, Repository } from 'typeorm';
import { PostgresEntitySchemaFactory } from './postgres-entity-schema.factory';
import { PostgresAbstractDocument } from './postgres-abstract.entity';
import { AggregateRoot } from '@nestjs/cqrs';



export class PostgresBaseRepository<
  TypeOrmEntity extends PostgresAbstractDocument,
  DomainEntity extends AggregateRoot,
> {
  constructor(
    private readonly typeOrmRepository: Repository<TypeOrmEntity>,
    protected readonly entitySchemaFactory: PostgresEntitySchemaFactory<
    TypeOrmEntity,
    DomainEntity
  >,
  ) {}

  async find(filterQuery: Partial<DomainEntity>): Promise<DomainEntity[]> {
    return (await this.typeOrmRepository.find({where: filterQuery} as any)).map(entityDocument =>
      this.entitySchemaFactory.createFromEntity(entityDocument)
    );
  }

  async findOne(filterQuery: FindOneOptions<TypeOrmEntity>): Promise<DomainEntity> {
    const entity = await this.typeOrmRepository.findOne(filterQuery);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return this.entitySchemaFactory.createFromEntity(entity);
  }

  async create(domainEntity: DomainEntity): Promise<DomainEntity> {
    const typeOrmEntity = this.entitySchemaFactory.create(domainEntity);
    const savedEntity = await this.typeOrmRepository.save(typeOrmEntity);
    return this.entitySchemaFactory.createFromEntity(savedEntity);
    
  }

  async update(id: number, domainEntity: DomainEntity): Promise<DomainEntity> {
    const typeOrmEntity = this.entitySchemaFactory.create(domainEntity);
    await this.typeOrmRepository.update(id, typeOrmEntity as any);
    const updatedEntity = await this.typeOrmRepository.findOneBy({ id } as any);
    if (!updatedEntity) {
      throw new Error('Entity not found after update');
    }
    return this.entitySchemaFactory.createFromEntity(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
