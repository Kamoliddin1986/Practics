import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './models/subject.model';
import { StuffSubject } from '../stuff_subjects/models/stuff_subject.model';
import { TestGroup } from '../test_group/models/test_group.model';

@Module({
  imports: [SequelizeModule.forFeature([Subject, StuffSubject, TestGroup])],
  controllers: [SubjectsController],
  providers: [SubjectsService]
})
export class SubjectsModule {}
