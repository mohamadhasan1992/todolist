import { PostgresAbstractDocument } from '@app/common/postgresdatabase/postgres-abstract.entity';
import { Column, Entity } from 'typeorm';



@Entity()
export class PaymentEntity extends PostgresAbstractDocument {
  @Column()
  user: string;

  @Column()
  quantity: number;
}