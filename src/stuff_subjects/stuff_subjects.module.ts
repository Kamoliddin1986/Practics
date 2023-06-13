import { Module } from '@nestjs/common';
import { StuffSubjectsService } from './stuff_subjects.service';
import { StuffSubjectsController } from './stuff_subjects.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { StuffSubject } from './models/stuff_subject.model';
import { Stuff } from '../stuff/models/stuff.model';
import { Subject } from '../subjects/models/subject.model';
import { StuffModule } from '../stuff/stuff.module';
import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports: [SequelizeModule.forFeature([StuffSubject, Stuff, Subject]),StuffModule, SubjectsModule],
  controllers: [StuffSubjectsController],
  providers: [StuffSubjectsService]
})
export class StuffSubjectsModule {}
