import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { Group } from '../group/models/group.model';
import { TestResult } from '../test_results/models/test_result.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Student,Group, TestResult]), JwtModule.register({})],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
