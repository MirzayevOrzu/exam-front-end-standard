import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateUserGuideDto {
  @ApiProperty({
    name: 'guide_id',
    description: 'ID of guide',
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  guide_id: string;

  @ApiProperty({
    name: 'user_id',
    description: 'ID of user',
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;
}
