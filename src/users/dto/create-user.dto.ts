/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(11)
  @MaxLength(13)
  phoneNumber: string;

  @IsString()
  password: string;
}
