import { PartialType } from '@nestjs/swagger';
import { CreateUserGuideDto } from './create-user-guide.dto';

export class UpdateUserGuideDto extends PartialType(CreateUserGuideDto) {}
