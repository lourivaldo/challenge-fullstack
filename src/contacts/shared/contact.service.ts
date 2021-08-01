import { Inject, Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './contact';
import { Contact as ContactEntity } from './contact.entity';

@Injectable({ scope: Scope.REQUEST })
export class ContactService {
  private readonly contactRepository: Repository<ContactEntity>;

  constructor(@Inject('ContactRepository') contact: Repository<ContactEntity>) {
    this.contactRepository = contact;
  }

  async getAll(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  async create(contacts: Contact[]) {
    const contactsToCreate: ContactEntity[] = contacts.map((contact) =>
      this.contactRepository.create({ ...contact }),
    );
    return this.contactRepository.save(contactsToCreate);
  }
}
