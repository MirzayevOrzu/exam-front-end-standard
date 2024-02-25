import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateBulk {
  @ApiProperty({
    name: 'guide_id',
    description: 'ID of guide to notify users about',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  guide_id: string;

  @ApiProperty({
    name: 'user_ids',
    description: 'IDs of users to send notification about guide',
    isArray: true,
    required: true,
    minLength: 1,
  })
  @IsArray()
  @IsMongoId({ each: true })
  user_ids: string[];
}
