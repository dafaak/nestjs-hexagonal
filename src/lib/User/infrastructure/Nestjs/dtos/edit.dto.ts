import { IsEmail, IsOptional, IsString } from 'class-validator';

export class Edit {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
