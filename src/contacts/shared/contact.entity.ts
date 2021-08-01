import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

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
}
