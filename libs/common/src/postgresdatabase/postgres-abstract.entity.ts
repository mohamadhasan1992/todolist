import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";






export abstract class PostgresAbstractDocument {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}