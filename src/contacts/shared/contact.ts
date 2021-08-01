import { IsPhoneNumber, IsNotEmpty, MaxLength } from 'class-validator';

export class Contact {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  cellphone: string;
}
