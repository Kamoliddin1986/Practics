import { AddRoleDto } from './dto/Add-role.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateStuffByAdminDto } from './dto/create-stuff-by_admin.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StuffService } from './stuff.service';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { StuffLoginDto } from './dto/login.dto';

@Controller('stuff')
export class StuffController {
  constructor(private readonly stuffService: StuffService) {}

  @Post('creat/teacher')
  createStuffByAdmin(@Body() createStuffByAdminDto: CreateStuffByAdminDto) {
    return this.stuffService.createStuffByAdmin(createStuffByAdminDto);
  }

@Post('/login')
login(@Body() stuffLoginDto: StuffLoginDto){
  return this.stuffService.login(stuffLoginDto)
}

  @Get()
  findAll() {
    return this.stuffService.findAll();
  }
  // @Get('/test')
  // test() {
  //   return this.stuffService.test();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stuffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStuffDto: UpdateStuffDto) {
    return this.stuffService.update(+id, updateStuffDto);
  }
  
  @Patch('/update/password/:id')
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.stuffService.updatePassword(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffService.remove(+id);
  }
}
