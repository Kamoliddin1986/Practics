import { TestGroup } from './../test_group/models/test_group.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { TestGroupService } from '../test_group/test_group.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private QuestionRepo: typeof Question,
    private readonly testGroupService: TestGroupService,

    ) {}
  
    async create(createQuestionDto: CreateQuestionDto) {
      const isExistsGroup = await this.testGroupService.findOne(createQuestionDto.test_group_id)
      if(!isExistsGroup){
        return new BadRequestException(`Subject_id ${createQuestionDto.test_group_id} is not exists`)
      }

      return this.QuestionRepo.create(createQuestionDto)
    }
  
    async findAll() {
  
      const verib = await this.QuestionRepo.findAll({include:{all: true, nested: true}})
      return verib
    }


  
    async findOne(id: number) {
      const verib = await this.QuestionRepo.findByPk(id,{include:{all: true, nested: true}})
      return verib
    }
  
    async update(id: number, updateQuestionDto: UpdateQuestionDto) {
      const verib = await this.QuestionRepo.update(updateQuestionDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.QuestionRepo.destroy({where: {id}})
    }
}
