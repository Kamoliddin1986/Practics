import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './models/role.model';
import { StuffRole } from '../stuff_role/models/stuff_role.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, StuffRole])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
