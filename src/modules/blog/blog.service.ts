import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Blog from './entities/blog.entity';
import { Repository } from 'typeorm';
import CreateBlogDto from './dto/create-blog.dto';
import UpdateBlogDto from './dto/update-blog.dto';

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

  async update(id: string, dto: UpdateBlogDto) {
    const blogToUpdate = await this.findById(id);

    this.blogRepo.merge(blogToUpdate, dto);

    return await this.blogRepo.save(blogToUpdate);
  }

  private findById(id: string) {
    return this.blogRepo.findOneByOrFail({ id });
  }
}
