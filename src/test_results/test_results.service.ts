import { Injectable } from '@nestjs/common';
import { CreateTestResultDto } from './dto/create-test_result.dto';
import { UpdateTestResultDto } from './dto/update-test_result.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestResult } from './models/test_result.model';

@Injectable()
export class TestResultsService {
  constructor(
    @InjectModel(TestResult) private RoleRepo: typeof TestResult
    ) {}
  
    create(createTestResultDto: CreateTestResultDto) {
      return this.RoleRepo.create(createTestResultDto)
    }
  
    async findAll() {
  
      const verib = await this.RoleRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.RoleRepo.findByPk(id,{include:{all: true}})
      return verib
    }

  
  
    async update(id: number, updateTestResultDto: UpdateTestResultDto) {
      const verib = await this.RoleRepo.update(updateTestResultDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.RoleRepo.destroy({where: {id}})
    }
}
