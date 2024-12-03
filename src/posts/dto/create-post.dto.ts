/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  userId: string;

  @IsString()
  message: string;
}
