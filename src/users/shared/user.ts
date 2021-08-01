import { Tenant } from '../../tenancy/shared/tenant.enum';

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  tenant: Tenant;
}
