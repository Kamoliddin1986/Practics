import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { ResultDetail } from '../result_detail/models/result_detail.model';
import { Question } from '../questions/models/question.model';
import { Answer } from './models/answer.model';

@Module({
  imports: [SequelizeModule.forFeature([ResultDetail,Question, Answer ])],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
