/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schema/post.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: mongoose.Model<Post>,

    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  // create a post
  async create(payload: CreatePostDto): Promise<Post> {
    const user = await this.userModel.findOne({ _id: payload.userId });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const result = await this.postModel.create(payload);
    return result;
  }

  // get all available post
  async findAll(): Promise<Post[]> {
    return await this.postModel.find();
  }

  // get single post by post_id
  async getPostById(postId: string): Promise<Post> {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }
    return post;
  }

  // find post by userId
  async getPostByUserId(userId: string): Promise<Post[]> {
    return await this.postModel.find({ userId });
  }

  async updateByPostId(id: string, payload: UpdatePostDto): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  }

  async deleteByPostID(id: string) {
    return await this.postModel.findByIdAndDelete(id);
  }
}
