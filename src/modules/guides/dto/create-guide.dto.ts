import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGuideDto {
  @ApiProperty({
    name: 'title',
    description: 'Title of guide',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    name: 'content',
    description: 'Content of guide',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    name: 'notify',
    description: 'Weither or not users should be notified about this',
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  notify?: boolean;
}
