import { Module, Scope } from '@nestjs/common';
import { ContactService } from './shared/contact.service';
import { ContactsController } from './contacts.controller';
import { MacapaContact } from './shared/macapa-contact.entity';
import { VarejaoContact } from './shared/varejao-contact.entity';
import { REQUEST } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TenancyService } from '../tenancy/tenancy.service';
import { JwtModule } from '@nestjs/jwt';
import { TenancyModule } from '../tenancy/tenancy.module';

const Repositories = {
  macapa: MacapaContact,
  varejao: VarejaoContact,
};

const contactServiceProvider = {
  provide: 'ContactRepository',
  scope: Scope.REQUEST,
  inject: [REQUEST, 'CONNECTION', TenancyService],
  useFactory: async (req, connection, tenancyService: TenancyService) => {
    const tenantId = await tenancyService.getTenant(req);

    if (Repositories[tenantId]) {
      return connection.getRepository(Repositories[tenantId]);
    }

    throw new Error('Invalid tenant');
  },
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    TenancyModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [ContactsController],
  providers: [ContactService, TenancyService, contactServiceProvider],
  exports: ['ContactRepository'],
})
export class ContactsModule {}
