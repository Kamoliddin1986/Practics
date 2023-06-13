import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestResultDto } from './dto/create-test_result.dto';
import { UpdateTestResultDto } from './dto/update-test_result.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestResult } from './models/test_result.model';
import { TestGroupService } from '../test_group/test_group.service';
import { StudentsService } from '../students/students.service';

@Injectable()
export class TestResultsService {
  constructor(
    @InjectModel(TestResult) private TestResultRepo: typeof TestResult,
    private readonly testGroupService: TestGroupService,
    private readonly studentsService: StudentsService

    ) {}
  
    async create(createTestResultDto: CreateTestResultDto) {
      const isExistsTestGroup = await this.testGroupService.findOne(createTestResultDto.test_group_id)
      const isExistsStudent = await this.studentsService.findOne(createTestResultDto.student_id)
      if(!isExistsTestGroup){
        return new BadRequestException(`Test group_id ${createTestResultDto.test_group_id} is not exists`)
      }
      if(!isExistsStudent){
        return new BadRequestException(`Student_id ${createTestResultDto.student_id} is not exists`)
      }

      return this.TestResultRepo.create(createTestResultDto)
    }
  
    async findAll() {
  
      const verib = await this.TestResultRepo.findAll({include:{all: true}})
      return verib
    }


  
    async findOne(id: number) {
      const verib = await this.TestResultRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateTestGroupDto: UpdateTestResultDto) {
      const verib = await this.TestResultRepo.update(updateTestGroupDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.TestResultRepo.destroy({where: {id}})
    }
}
