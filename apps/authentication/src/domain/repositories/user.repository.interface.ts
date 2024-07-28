import { User } from "../entities/user.entity";



export interface IUserRepository {
  findByEmail(email: string): Promise<User|null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  save(user: User): Promise<void>;
  deleteById(id: string): Promise<void>;
}