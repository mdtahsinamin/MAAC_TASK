/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create-user')
  @UsePipes(new ValidationPipe())
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get()
  findByEmail(@Body() payload: { email: string }) {
    return this.usersService.findByEmail(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.updateById(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteById(id);
  }
}
