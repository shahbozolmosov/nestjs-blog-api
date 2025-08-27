import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export default class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @Length(5, 255)
  @IsOptional()
  description?: string;
}
