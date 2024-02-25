import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OffsetPaginationDto } from 'src/shared/dto/offset-pagination.dto';
import { SortOrder } from 'src/shared/types/enums';

export class SortGuidesDto {
  @ApiProperty({
    name: 'sort[by]',
    description: 'Sort guides by either id',
    enum: ['id'],
    enumName: 'by',
    required: false,
  })
  @IsOptional()
  @IsEnum(['id'])
  by?: string;

  @ApiProperty({
    name: 'sort[order]',
    description: 'In which order sort guides',
    enum: SortOrder,
    enumName: 'order',
    required: false,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;
}

export class FindGuidesDto {
  @ApiProperty({
    name: 'q',
    description: 'Search guides by their title',
    required: false,
  })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => OffsetPaginationDto)
  page?: OffsetPaginationDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => SortGuidesDto)
  sort?: SortGuidesDto;
}
