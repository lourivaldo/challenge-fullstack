import { Column, Entity } from 'typeorm';
import { Contact } from './contact.entity';
import { IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

@Entity({ name: 'contacts' })
export class VarejaoContact extends Contact {
  @Column({ name: 'nome', length: 100 })
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @Column({ name: 'celular', length: 13 })
  @IsNotEmpty()
  @MaxLength(13)
  cellphone: string;

  transform() {
    this.cellphone = this.cellphone.replace(/\D/, '');
  }
}
