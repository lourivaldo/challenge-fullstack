import { Module } from '@nestjs/common';
import { UsersService } from './shared/users.service';
import { MockUsersRepository } from './shared/mock-users.repository';
import { USERS_REPOSITORY } from './shared/users.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: MockUsersRepository,
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
