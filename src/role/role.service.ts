import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private RoleRepo: typeof Role
    ) {}
  
    create(createRoleDto: CreateRoleDto) {
      return this.RoleRepo.create(createRoleDto)
    }
  
    async findAll() {
  
      const verib = await this.RoleRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.RoleRepo.findByPk(id,{include:{all: true}})
      return verib
    }

    async findByName(name: string) {
      const verib = await this.RoleRepo.findOne({where: {name}})
      return verib
    }
  
    async update(id: number, updateRoleDto: UpdateRoleDto) {
      const verib = await this.RoleRepo.update(updateRoleDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.RoleRepo.destroy({where: {id}})
    }
}
