import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserEntityFactory } from '../../domain/entityFactory/UserEntity.factory';
import { SignUpUserResponse } from '@app/common/types/auth';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { compareHash } from '@app/common';



@Injectable()
export class AuthService {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: IUserRepository,
    private readonly userFactory: UserEntityFactory,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
) {}

  async login(email: string, password: string): Promise<{ token: string, message: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (user && await(user.validatePassword(password))) {
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
    return this.userRepository.findByEmail(email);
  }
}
