import { IsEmail, IsString, Length } from 'class-validator';

export class Create {
  @IsString()
  @Length(5, 255)
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
