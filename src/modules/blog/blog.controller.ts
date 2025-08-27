import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import CreateBlogDto from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateBlogDto) {
    const data = await this.blogService.create(dto);

    return data;
  }
}
