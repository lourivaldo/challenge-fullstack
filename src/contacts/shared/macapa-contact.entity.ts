import { Entity } from 'typeorm';
import { Contact } from './contact.entity';

@Entity({ name: 'contacts' })
export class MacapaContact extends Contact {
  transform() {
    this.name = this.name.toUpperCase();
    this.cellphone = this.cellphone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
  }
}
