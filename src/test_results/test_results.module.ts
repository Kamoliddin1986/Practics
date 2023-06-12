import { Module } from '@nestjs/common';
import { TestResultsService } from './test_results.service';
import { TestResultsController } from './test_results.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from '../students/models/student.model';
import { TestResult } from './models/test_result.model';
import { TestGroup } from '../test_group/models/test_group.model';
import { ResultDetail } from '../result_detail/models/result_detail.model';

@Module({
  imports: [SequelizeModule.forFeature([Student,ResultDetail, TestResult, TestGroup])],
  controllers: [TestResultsController],
  providers: [TestResultsService]
})
export class TestResultsModule {}
