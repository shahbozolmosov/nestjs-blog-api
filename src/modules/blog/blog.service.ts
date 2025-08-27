import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Blog from './entities/blog.entity';
import { Repository } from 'typeorm';
import CreateBlogDto from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
  ) {}

  async create(dto: CreateBlogDto) {
    const newBlog = this.blogRepo.create(dto);

    this.blogRepo.save(newBlog);

    return newBlog;
  }

  findAll() {
    return this.blogRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
