import { Controller, Get } from '@nestjs/common';

@Controller('blog')
export class BlogController {
  @Get('/')
  findAll() {
    return 'All blog';
  }
}
