import { StudentsModule } from './../students/students.module';
import { Module } from '@nestjs/common';
import { TestResultsService } from './test_results.service';
import { TestResultsController } from './test_results.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from '../students/models/student.model';
import { TestResult } from './models/test_result.model';
import { TestGroup } from '../test_group/models/test_group.model';
import { ResultDetail } from '../result_detail/models/result_detail.model';
import { TestGroupModule } from '../test_group/test_group.module';

@Module({
  imports: [SequelizeModule.forFeature([Student,ResultDetail, TestResult, TestGroup]), StudentsModule, TestGroupModule],
  controllers: [TestResultsController],
  providers: [TestResultsService],
  exports:  [TestResultsService]
})
export class TestResultsModule {}
