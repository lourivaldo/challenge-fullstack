import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Tenant } from './shared/tenant.enum';

@Injectable()
export class TenancyService {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  async getTenant(req: Request): Promise<Tenant> {
    const token = req.headers.authorization.split(' ')[1];
    const payload = this.jwtService.decode(token) as { tenant: Tenant };
    return payload && payload.tenant;
  }
}
