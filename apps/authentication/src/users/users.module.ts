import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongodatabaseModule } from '@app/common';
import { UsersRepository } from './users.repository';
import { UserDocument, UserSchema } from './entities/user.schema';



@Module({
  imports: [
    MongodatabaseModule.forFeature([{name: UserDocument.name, schema: UserSchema}])
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
