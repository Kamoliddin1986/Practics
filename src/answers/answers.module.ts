import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { ResultDetail } from '../result_detail/models/result_detail.model';
import { Question } from '../questions/models/question.model';
import { Answer } from './models/answer.model';
import { QuestionsModule } from '../questions/questions.module';
import { QuestionsService } from '../questions/questions.service';

@Module({
  imports: [SequelizeModule.forFeature([ResultDetail,Question, Answer ]), QuestionsModule],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService]
})
export class AnswersModule {}
