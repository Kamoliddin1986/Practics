import { Module } from '@nestjs/common';
import { ResultDetailService } from './result_detail.service';
import { ResultDetailController } from './result_detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from '../answers/models/answer.model';
import { ResultDetail } from './models/result_detail.model';
import { Question } from '../questions/models/question.model';
import { TestResult } from '../test_results/models/test_result.model';

@Module({
  imports:[SequelizeModule.forFeature([ResultDetail,Answer,Question,TestResult])],
  controllers: [ResultDetailController],
  providers: [ResultDetailService]
})
export class ResultDetailModule {}
