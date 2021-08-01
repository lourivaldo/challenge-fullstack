import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { validateOrReject } from 'class-validator';

@Entity({ name: 'contacts' })
export abstract class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'celular' })
  cellphone: string;

  abstract transform();

  @BeforeInsert()
  async beforeInsert() {
    await this.transform();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
