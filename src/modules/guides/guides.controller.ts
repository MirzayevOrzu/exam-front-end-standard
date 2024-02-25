import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HasRole } from 'src/shared/guards/has-roles.guard';
import { IsLoggedIn } from 'src/shared/guards/is-loggedin.guard';
import { UserRole } from 'src/shared/types/enums';
import { SetRoles } from '../auth/set-roles.decorator';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { GuidesService } from './guides.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FindGuidesDto } from './dto/find-guide.dto';

@ApiBearerAuth()
@SetRoles(UserRole.ADMIN)
@UseGuards(IsLoggedIn, HasRole)
@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Post()
  create(@Body() data: CreateGuideDto) {
    return this.guidesService.create(data);
  }

  @Get()
  findAll(@Query() findGuidesDto: FindGuidesDto) {
    return this.guidesService.findAll(findGuidesDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guidesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateGuideDto) {
    return this.guidesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guidesService.remove(id);
  }
}
