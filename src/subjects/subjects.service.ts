import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from './models/subject.model';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject) private GroupRepo: typeof Subject
    ) {}
  
    create(createSubjectDto: CreateSubjectDto) {
      return this.GroupRepo.create(createSubjectDto)
    }
  
    async findAll() {
  
      const verib = await this.GroupRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.GroupRepo.findByPk(id,{include:{all: true}})
      return verib
    }

  
  
    async update(id: number, updateSubjectDto: UpdateSubjectDto) {
      const verib = await this.GroupRepo.update(updateSubjectDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.GroupRepo.destroy({where: {id}})
    }
}
