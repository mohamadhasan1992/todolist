import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserEntityRepository } from '../../infrustructure/repositories/user-entity.repository';
import { UserEntityFactory } from '../../domain/entityFactory/UserEntity.factory';
import { SignUpUserResponse } from '@app/common/types/auth';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';



@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly userFactory: UserEntityFactory,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
) {}

  async login(email: string, password: string): Promise<{ token: string, message: string }> {
    const user = await this.userRepository.findOne({email});
    if (user && user.validatePassword(password)) {
        const token = this.jwtService.sign({email: user.getEmail(), userId: user.getId()});
        // cahce user
        await this.cacheManager.set(user.getId(), user);
        return { token, message: 'Login successful' };
    }
    throw new RpcException('Invalid credentials');
  }

  async signup(name: string, email: string, password: string): Promise<SignUpUserResponse> {
    await this.userFactory.create(name, email, password)
    return { message: 'Registration successful' };
  }

  async getUser(email: string): Promise<User | null> {
    return this.userRepository.findOne({email});
  }
}
