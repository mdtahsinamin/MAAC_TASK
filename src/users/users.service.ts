/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) // decorator
    private userModel: mongoose.Model<User>,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: payload.email });

    if (user) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const result = await this.userModel.create(payload);
    return result;
  }

  async findByEmail(payload: { email: string }): Promise<User | null> {
    const user = await this.userModel.findOne({ email: payload.email });

    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async updateById(id: string, payload: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
