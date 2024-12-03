/* eslint-disable prettier/prettier */

// eslint-disable-next-line prettier/prettier

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(11)
  @MaxLength(13)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  password: string;
}
