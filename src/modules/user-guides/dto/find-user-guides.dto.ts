import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { OffsetPaginationDto } from 'src/shared/dto/offset-pagination.dto';

export class FilterUsersDto {
  @ApiProperty({
    name: 'completed',
    description: 'Filter user guides by weither they are completed or not',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({
    name: 'user_id',
    description: 'Filter user guides of specific user',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  user_id?: string;
}

export class FindUserGuidesDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => OffsetPaginationDto)
  page?: OffsetPaginationDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterUsersDto)
  filters?: FilterUsersDto;
}
