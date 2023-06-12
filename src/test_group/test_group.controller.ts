import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestGroupService } from './test_group.service';
import { CreateTestGroupDto } from './dto/create-test_group.dto';
import { UpdateTestGroupDto } from './dto/update-test_group.dto';

@Controller('test-group')
export class TestGroupController {
  constructor(private readonly testGroupService: TestGroupService) {}

  @Post()
  create(@Body() createTestGroupDto: CreateTestGroupDto) {
    return this.testGroupService.create(createTestGroupDto);
  }

  @Get()
  findAll() {
    return this.testGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestGroupDto: UpdateTestGroupDto) {
    return this.testGroupService.update(+id, updateTestGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testGroupService.remove(+id);
  }
}
