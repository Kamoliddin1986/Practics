import { JwtModule } from '@nestjs/jwt';
import { Role } from './../role/models/role.model';
import { RoleModule } from './../role/role.module';
import { StuffRoleModule } from './../stuff_role/stuff_role.module';
import { RoleService } from './../role/role.service';
import { StuffRoleService } from './../stuff_role/stuff_role.service';
import { Module, forwardRef } from '@nestjs/common';
import { StuffService } from './stuff.service';
import { StuffController } from './stuff.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stuff } from './models/stuff.model';
import { StuffRole } from '../stuff_role/models/stuff_role.model';
import { StuffGroup } from '../stuff_group/models/stuff_group.model';
import { StuffSubject } from '../stuff_subjects/models/stuff_subject.model';

@Module({
  imports: [ RoleModule, forwardRef(()=> StuffRoleModule), SequelizeModule.forFeature([Stuff,StuffSubject, StuffRole, StuffGroup, Role]), 
JwtModule.register({})],
  controllers: [StuffController],
  providers: [StuffService],
  exports: [StuffService]
})
export class StuffModule {}
