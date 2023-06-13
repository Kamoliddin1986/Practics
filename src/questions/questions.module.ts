import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { TestGroup } from '../test_group/models/test_group.model';
import { ResultDetail } from '../result_detail/models/result_detail.model';
import { Answer } from '../answers/models/answer.model';
import { TestGroupModule } from '../test_group/test_group.module';
import { TestGroupService } from '../test_group/test_group.service';

@Module({
  imports: [SequelizeModule.forFeature([Question,Answer,ResultDetail,TestGroup]),TestGroupModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService]
})
export class QuestionsModule {}
