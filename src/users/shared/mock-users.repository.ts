import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UsersRepository } from './users.repository';
import { Tenant } from '../../tenancy/shared/tenant.enum';

const USERS: User[] = [
  {
    id: '1',
    email: 'macapa@macapa.com',
    name: 'Macapa',
    password: '1234',
    tenant: Tenant.MACAPA,
  },
  {
    id: '2',
    email: 'varejao@varejao.com',
    name: 'Varejao',
    password: '5678',
    tenant: Tenant.VAREJAO,
  },
];

@Injectable()
export class MockUsersRepository implements UsersRepository {
  async getByEmail(email: string): Promise<User> {
    // @TODO Implement by database, http request, gRPC...
    return USERS.find((user: User) => user.email === email);
  }
}
