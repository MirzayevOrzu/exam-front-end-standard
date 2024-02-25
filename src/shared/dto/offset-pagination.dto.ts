import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class OffsetPaginationDto {
  @ApiProperty({
    name: 'page[offset]',
    description: 'How many entries to skip before counting',
    required: false,
  })
  @IsInt()
  @Transform(({ value }) => +value)
  offset: number;

  @ApiProperty({
    name: 'page[limit]',
    description: 'How many entries to return',
    required: false,
  })
  @IsInt()
  @Transform(({ value }) => +value)
  limit: number;
}
