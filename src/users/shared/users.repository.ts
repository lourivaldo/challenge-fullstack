import { User } from './user';

export const USERS_REPOSITORY = 'UsersRepository';

export interface UsersRepository {
  getByEmail(email: string): Promise<User>;
}
