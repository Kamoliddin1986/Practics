import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestGroupDto } from './dto/create-test_group.dto';
import { UpdateTestGroupDto } from './dto/update-test_group.dto';
import { SubjectsService } from '../subjects/subjects.service';
import { TestGroup } from './models/test_group.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TestGroupService {
  constructor(
    @InjectModel(TestGroup) private TestGroupRepo: typeof TestGroup,
    private readonly subjectsService: SubjectsService,

    ) {}
  
    async create(createTestGroupDto: CreateTestGroupDto) {
      const isExistsGroup = await this.subjectsService.findOne(createTestGroupDto.subject_id)
      if(!isExistsGroup){
        return new BadRequestException(`Subject_id ${createTestGroupDto.subject_id} is not exists`)
      }

      return this.TestGroupRepo.create(createTestGroupDto)
    }
  
    async findAll() {
  
      const verib = await this.TestGroupRepo.findAll({include:{all: true}})
      return verib
    }


  
    async findOne(id: number) {
      const verib = await this.TestGroupRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateTestGroupDto: UpdateTestGroupDto) {
      const verib = await this.TestGroupRepo.update(updateTestGroupDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.TestGroupRepo.destroy({where: {id}})
    }
}
