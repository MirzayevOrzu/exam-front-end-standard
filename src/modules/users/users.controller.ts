import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SetRoles } from '../auth/set-roles.decorator';
import { UserRole } from 'src/shared/types/enums';
import { IsLoggedIn } from 'src/shared/guards/is-loggedin.guard';
import { HasRole } from 'src/shared/guards/has-roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateMeDto, UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@SetRoles(UserRole.ADMIN)
@UseGuards(IsLoggedIn, HasRole)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  findAll(@Query() findUsersDto: FindUsersDto) {
    return this.usersService.findAll(findUsersDto);
  }

  @SetRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get('me')
  findMe(@Req() req) {
    return this.usersService.findOne(req['user'].id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('me')
  updateMe(@Body() data: UpdateMeDto, @Req() req) {
    return this.usersService.update(req['user'].id, data);
  }

  @SetRoles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
