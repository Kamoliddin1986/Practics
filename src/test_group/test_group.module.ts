import { Module } from '@nestjs/common';
import { TestGroupService } from './test_group.service';
import { TestGroupController } from './test_group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from '../subjects/models/subject.model';
import { TestGroup } from './models/test_group.model';
import { Question } from '../questions/models/question.model';
import { TestResult } from '../test_results/models/test_result.model';

@Module({
  imports: [SequelizeModule.forFeature([Subject,Question,TestResult, TestGroup])],
  controllers: [TestGroupController],
  providers: [TestGroupService]
})
export class TestGroupModule {}
