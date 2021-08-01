import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createConnection, getConnectionManager } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { TenancyService } from './tenancy.service';
import { JwtModule } from '@nestjs/jwt';

const connectionFactory = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  inject: [REQUEST, TenancyService],
  useFactory: async (req, tenancyService: TenancyService) => {
    const tenant = await tenancyService.getTenant(req);
    if (tenant) {
      const connectionName = `tenant_${tenant}`;
      const connectionManager = getConnectionManager();

      if (connectionManager.has(connectionName)) {
        const connection = connectionManager.get(connectionName);
        return Promise.resolve(
          connection.isConnected ? connection : connection.connect(),
        );
      }

      const TENANT_PREFIX = `${tenant.toUpperCase()}_`;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return createConnection({
        name: connectionName,
        type: process.env[`${TENANT_PREFIX}DB_CONNECTION`],
        host: process.env[`${TENANT_PREFIX}DB_HOST`],
        port: +process.env[`${TENANT_PREFIX}DB_PORT`],
        username: process.env[`${TENANT_PREFIX}DB_USERNAME`],
        password: process.env[`${TENANT_PREFIX}DB_PASSWORD`],
        database: process.env[`${TENANT_PREFIX}DB_DATABASE`],
        entities: ['dist/**/*.entity{.ts,.js}'],
      });
    }

    return getConnectionManager().get();
  },
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [connectionFactory, TenancyService],
  exports: ['CONNECTION'],
})
export class TenancyModule {}
