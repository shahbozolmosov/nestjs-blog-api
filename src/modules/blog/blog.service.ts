import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Blog from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
  ) {}

  create(){
    
  }

  findAll() {
    return this.blogRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
