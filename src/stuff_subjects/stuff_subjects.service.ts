import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStuffSubjectDto } from './dto/create-stuff_subject.dto';
import { UpdateStuffSubjectDto } from './dto/update-stuff_subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StuffSubject } from './models/stuff_subject.model';
import { StuffService } from '../stuff/stuff.service';
import { SubjectsService } from '../subjects/subjects.service';

@Injectable()
export class StuffSubjectsService {
  constructor(
    @InjectModel(StuffSubject) private StuffGroupRepo: typeof StuffSubject,
    private  subjectService: SubjectsService,
    private readonly stuffService: StuffService,

    ) {}
  
    async create(createStuffSubjectDto: CreateStuffSubjectDto) {
      const isExistsSubject = await this.subjectService.findOne(createStuffSubjectDto.subject_id)
      if(!isExistsSubject){
        return new BadRequestException(`Subject_id ${createStuffSubjectDto.subject_id} is not exists`)
      }

      const isExistsStuff = await this.stuffService.findOne(createStuffSubjectDto.stuff_id)
      if(!isExistsStuff){
        return new BadRequestException(`Stuff_id ${createStuffSubjectDto.stuff_id} is not exists`)
      }


      return this.StuffGroupRepo.create(createStuffSubjectDto)
    }
  
    async findAll() {
  
      const verib = await this.StuffGroupRepo.findAll({include:{all: true}})
      return verib
    }

    async findAllRoles(id: number) {
      const verib = await this.StuffGroupRepo.findAll({where: {stuff_id: id}, include: {all:true}},)
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.StuffGroupRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateStuffSubjectDto: UpdateStuffSubjectDto) {
      const verib = await this.StuffGroupRepo.update(updateStuffSubjectDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.StuffGroupRepo.destroy({where: {id}})
    }
}
