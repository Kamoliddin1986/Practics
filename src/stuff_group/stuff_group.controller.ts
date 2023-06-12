import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StuffGroupService } from './stuff_group.service';
import { CreateStuffGroupDto } from './dto/create-stuff_group.dto';
import { UpdateStuffGroupDto } from './dto/update-stuff_group.dto';

@Controller('stuff-group')
export class StuffGroupController {
  constructor(private readonly stuffGroupService: StuffGroupService) {}

  @Post()
  create(@Body() createStuffGroupDto: CreateStuffGroupDto) {
    return this.stuffGroupService.create(createStuffGroupDto);
  }

  @Get()
  findAll() {
    return this.stuffGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stuffGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStuffGroupDto: UpdateStuffGroupDto) {
    return this.stuffGroupService.update(+id, updateStuffGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffGroupService.remove(+id);
  }
}
