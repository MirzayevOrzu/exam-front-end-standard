import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/shared/types/enums';

export class CreateUserDto {
  @ApiProperty({
    name: 'first_name',
    description: 'First name of user',
    example: 'Abdulloh',
    maximum: 25,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25, {
    message: 'First name 25 ta belgidan oshmasligi kerak.',
  })
  first_name: string;

  @ApiProperty({
    name: 'last_name',
    description: 'Last name of user',
    example: 'Aburazzoqov',
    maximum: 25,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25, {
    message: 'Last name 25 ta belgidan oshmasligi kerak.',
  })
  last_name: string;

  @ApiProperty({
    name: 'age',
    description: 'Age name of user',
    example: 23,
    maximum: 60,
    minimum: 16,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(16, {
    message: "Age 16 va 60 oralig'ida bo'lishi kerak.",
  })
  @Max(60, {
    message: "Age 16 va 60 oralig'ida bo'lishi kerak.",
  })
  age: number;

  @ApiProperty({
    name: 'role',
    description: 'Role of user',
    examples: ['employee', 'admin'],
    enum: ['employee', 'admin'],
    enumName: 'Role',
  })
  @IsNotEmpty()
  @IsEnum(UserRole, {
    message: "Role admin yoki employee bo'lishi kerak.",
  })
  role: UserRole;

  @ApiProperty({
    name: 'username',
    description: 'Username of user',
    example: 'abdulloh007',
    maximum: 25,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25, {
    message: 'Username 25 ta belgidan oshmasligi kerak.',
  })
  username: string;

  @ApiProperty({
    name: 'password',
    description: 'Password of user',
    example: 'qwerty1234',
    minimum: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Password minimum 8 ta bo'lishi kerak." })
  password: string;
}
