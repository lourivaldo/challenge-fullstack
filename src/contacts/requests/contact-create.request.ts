import { Contact } from '../shared/contact';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ContactCreateRequest {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Contact)
  contacts: Contact[];
}
