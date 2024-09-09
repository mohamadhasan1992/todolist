import { FindOneOptions } from "typeorm";

export abstract class AbstractRepository<TypeOrmEntity, DomainEntity> {
    abstract find(filterQuery: Partial<TypeOrmEntity>): Promise<DomainEntity[]>;
    abstract findOne(filterQuery: FindOneOptions<TypeOrmEntity>): Promise<DomainEntity>;
    abstract create(entity: DomainEntity): Promise<DomainEntity>;
    abstract update(id: number, entity: DomainEntity): Promise<DomainEntity>;
    abstract delete(id: number): Promise<void>;
  }