import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateMeDto extends OmitType(UpdateUserDto, [
  'password',
  'role',
]) {}
