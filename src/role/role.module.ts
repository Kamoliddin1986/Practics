import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './models/role.model';
import { StuffRole } from '../stuff_role/models/stuff_role.model';
import { StuffModule } from '../stuff/stuff.module';
import { StuffRoleModule } from '../stuff_role/stuff_role.module';

@Module({
  imports: [SequelizeModule.forFeature([Role, StuffRole])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
