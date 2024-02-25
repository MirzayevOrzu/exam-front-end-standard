import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HasRole } from 'src/shared/guards/has-roles.guard';
import { IsLoggedIn } from 'src/shared/guards/is-loggedin.guard';
import { UserRole } from 'src/shared/types/enums';
import { SetRoles } from '../auth/set-roles.decorator';
import { CreateBulk } from './dto/create-bulk.dto';
import { FindUserGuidesDto } from './dto/find-user-guides.dto';
import { UserGuidesService } from './user-guides.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(IsLoggedIn, HasRole)
@Controller('user-guides')
export class UserGuidesController {
  constructor(private readonly userGuidesService: UserGuidesService) {}

  @Post(':id/read')
  read(@Param('id') id: string, @Req() req) {
    return this.userGuidesService.read(id, req['user'].id);
  }

  @SetRoles(UserRole.ADMIN)
  @Post('bulk')
  createBulk(@Body() data: CreateBulk) {
    return this.userGuidesService.createBulk(data);
  }

  @SetRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @Get()
  findAll(@Query() findUserGuidesDto: FindUserGuidesDto, @Req() req) {
    if (req['user'].role === UserRole.EMPLOYEE) {
      findUserGuidesDto = {
        ...findUserGuidesDto,
        filters: { ...findUserGuidesDto?.filters, user_id: req['user'].id },
      };
    }

    return this.userGuidesService.findAll(findUserGuidesDto);
  }
}
