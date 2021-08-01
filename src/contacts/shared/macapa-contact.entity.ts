import { Column, Entity } from 'typeorm';
import { Contact } from './contact.entity';
import { IsNotEmpty, MaxLength } from 'class-validator';

@Entity({ name: 'contacts' })
export class MacapaContact extends Contact {
  @Column({ name: 'nome', length: 200 })
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @Column({ name: 'celular', length: 20 })
  @IsNotEmpty()
  @MaxLength(20)
  cellphone: string;

  transform() {
    this.name = this.name.toUpperCase();
    this.cellphone = this.cellphone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
  }
}
