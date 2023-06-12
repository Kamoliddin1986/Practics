import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateStudentPasswordDto } from './dto/update-password.dto';
import { StudentLoginDto } from './dto/login.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  createStudentByAdmin(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudentByAdmin(createStudentDto);
  }

  @Post('/login')
  login(@Body() studentLoginDto: StudentLoginDto){
    return this.studentsService.login(studentLoginDto)
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Patch('/update/password/:id')
  updatePassword(@Param('id') id: string, @Body() updateStudentPasswordDto: UpdateStudentPasswordDto) {
    return this.studentsService.updatePassword(+id, updateStudentPasswordDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }
  @Patch('active/:id')
  active(@Param('id') id: string) {
    return this.studentsService.active(+id);
  }
  @Patch('deactive/:id')
  deActive(@Param('id') id: string) {
    return this.studentsService.deActive(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
