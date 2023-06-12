import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from '../students/models/student.model';
import { Group } from './models/group.model';
import { StuffGroup } from '../stuff_group/models/stuff_group.model';

@Module({
  imports: [SequelizeModule.forFeature([Student, Group, StuffGroup])],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
