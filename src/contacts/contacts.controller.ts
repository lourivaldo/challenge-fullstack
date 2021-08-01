import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { ContactService } from './shared/contact.service';
import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { Contact } from './shared/contact';
import { ContactCreateRequest } from './requests/contact-create.request';

@Controller('contacts')
export class ContactsController {
  constructor(private contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Contact[]> {
    return this.contactService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() { contacts }: ContactCreateRequest): Promise<Contact[]> {
    return this.contactService.create(contacts);
  }
}
