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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create-post')
  @UsePipes(new ValidationPipe())
  create(@Body() payload: CreatePostDto) {
    return this.postsService.create(payload);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.postsService.getPostByUserId(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdatePostDto) {
    return this.postsService.updateByPostId(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.deleteByPostID(id);
  }
}
