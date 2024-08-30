import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserEntityFactory } from '../../domain/entityFactory/UserEntity.factory';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { IUserQueryRepository} from '../../domain/repositories/user.repository.interface';



@Injectable()
export class AuthService {
  constructor(
    @Inject("UserQueryRepository")
    private readonly userQueryRepository: IUserQueryRepository,
    private readonly userFactory: UserEntityFactory,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
) {}

  async login(email: string, password: string): Promise<{ token: string, message: string }> {
    const user = await this.userQueryRepository.findByEmail(email);
    if (user && await(user.validatePassword(password))) {
        const token = this.jwtService.sign({email: user.getEmail(), userId: user.getId()});
        // cahce user
        await this.cacheManager.set(user.getId(), user);
        return { token, message: 'Login successful' };
    }
    throw new RpcException('Invalid credentials');
  }

  async signup(name: string, email: string, password: string): Promise<any> {
    await this.userFactory.create(name, email, password)
    return { message: 'Registration successful' };
  }

  async getUser(email: string): Promise<User | null> {
    return this.userQueryRepository.findByEmail(email);
  }

  async processAuthentication(data: any): Promise<void> {
    console.log('Processing authentication:', data);

    // Simulate authentication logic
    const isAuthenticated = data.username === 'user' && data.password === 'pass';

    console.log('Authentication result:', isAuthenticated);
  }
}
