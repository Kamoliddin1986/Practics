import { Module } from '@nestjs/common';
import { StuffRoleService } from './stuff_role.service';
import { StuffRoleController } from './stuff_role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stuff } from '../stuff/models/stuff.model';
import { StuffRole } from './models/stuff_role.model';
import { Role } from '../role/models/role.model';
import { RoleModule } from '../role/role.module';
import { StuffService } from '../stuff/stuff.service';
import { StuffModule } from '../stuff/stuff.module';

@Module({
  imports: [SequelizeModule.forFeature([Stuff, StuffRole, Role])],
  controllers: [StuffRoleController],
  providers: [StuffRoleService],
  exports: [StuffRoleService]
})
export class StuffRoleModule {}
