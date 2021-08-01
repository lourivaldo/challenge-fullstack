import { User } from './user';
import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async getByEmail(email: string): Promise<User> {
    return this.usersRepository.getByEmail(email);
  }
}
