import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import CreateBlogDto from './dto/create-blog.dto';
import UpdateBlogDto from './dto/update-blog.dto';

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

  @Post(':id')
  async update(
    @Body() dto: UpdateBlogDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.blogService.update(id, dto);

    return data;
  }
}
