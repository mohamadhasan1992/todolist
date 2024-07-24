import { User } from "../entities/user.entity";



export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(todo: User): Promise<void>;
  deleteById(id: string): Promise<void>;
}