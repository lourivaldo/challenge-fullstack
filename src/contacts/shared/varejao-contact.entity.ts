import { Entity } from 'typeorm';
import { Contact } from './contact.entity';

@Entity({ name: 'contacts' })
export class VarejaoContact extends Contact {
  transform() {
    this.cellphone = this.cellphone.replace(/\D/, '');
  }
}
