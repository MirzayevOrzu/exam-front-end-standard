import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OffsetPaginationDto } from 'src/shared/dto/offset-pagination.dto';
import { SortOrder, UserRole } from 'src/shared/types/enums';

export class SortUsersDto {
  @ApiProperty({
    name: 'sort[by]',
    description: 'Sort users by either age or id',
    enum: ['age', 'id'],
    enumName: 'by',
    required: false,
  })
  @IsOptional()
  @IsEnum(['age', 'id'])
  by?: string;

  @ApiProperty({
    name: 'sort[order]',
    description: 'In which order sort users',
    enum: SortOrder,
    enumName: 'order',
    required: false,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;
}

export class FilterUsersDto {
  @ApiProperty({
    name: 'filters[role]',
    description: 'Filter users by their role',
    enum: UserRole,
    enumName: 'role',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class FindUsersDto {
  @ApiProperty({
    name: 'q',
    description: 'Search users by first and last names',
    maximum: 25,
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
  @Type(() => SortUsersDto)
  sort?: SortUsersDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterUsersDto)
  filters?: FilterUsersDto;
}
