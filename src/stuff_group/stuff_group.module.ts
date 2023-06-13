import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { StuffGroupService } from './stuff_group.service';
import { StuffGroupController } from './stuff_group.controller';
import { StuffGroup } from './models/stuff_group.model';
import { Group } from '../group/models/group.model';
import { Stuff } from '../stuff/models/stuff.model';
import { GroupModule } from '../group/group.module';
import { StuffModule } from '../stuff/stuff.module';

@Module({
  imports: [SequelizeModule.forFeature([StuffGroup, Group, Stuff]), GroupModule,StuffModule],
  controllers: [StuffGroupController],
  providers: [StuffGroupService]
})
export class StuffGroupModule {}
