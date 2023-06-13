import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './models/answer.model';
import { InjectModel } from '@nestjs/sequelize';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer) private AnswerRepo: typeof Answer,
    private readonly questionService: QuestionsService,

    ) {}
  
    async create(createAnswerDto: CreateAnswerDto) {
      const isExistsquestion = await this.questionService.findOne(createAnswerDto.question_id)
      if(!isExistsquestion){
        return new BadRequestException(`Subject_id ${createAnswerDto.question_id} is not exists`)
      }

      return this.AnswerRepo.create(createAnswerDto)
    }
  
    async findAll() {
  
      const verib = await this.AnswerRepo.findAll({include:{all: true, nested: true}})
      return verib
    }


  
    async findOne(id: number) {
      const verib = await this.AnswerRepo.findByPk(id,{include:{all: true, nested: true}})
      return verib
    }
  
    async update(id: number, updateAnswerDto: UpdateAnswerDto) {
      const verib = await this.AnswerRepo.update(updateAnswerDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.AnswerRepo.destroy({where: {id}})
    }
}
