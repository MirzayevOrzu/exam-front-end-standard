import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    name: 'username',
    description: 'Username of user',
    example: 'abdulloh007',
    maximum: 25,
  })
  @IsString()
  username: string;

  @ApiProperty({
    name: 'password',
    description: 'Password of user',
    example: 'qwerty1234',
    minimum: 8,
  })
  @IsString()
  password: string;
}
