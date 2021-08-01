import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/shared/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === password) {
      const { id, name, email, tenant } = user;
      return { id, name, email, tenant };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      name: user.name,
      sub: user.id,
      tenant: user.tenant,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
