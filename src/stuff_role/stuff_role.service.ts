import { Sequelize } from 'sequelize';
import { StuffRole } from './models/stuff_role.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStuffRoleDto } from './dto/create-stuff_role.dto';
import { UpdateStuffRoleDto } from './dto/update-stuff_role.dto';
import { InjectModel } from "@nestjs/Sequelize";
import { Role } from '../role/models/role.model';
import { Stuff } from '../stuff/models/stuff.model';
@Injectable()
export class StuffRoleService {
  constructor(
    @InjectModel(StuffRole) private StuffRoleRepo: typeof StuffRole,
    @InjectModel(Role) private RoleRepo: typeof Role,
    @InjectModel(Stuff) private StuffRepo: typeof Stuff,

    ) {}
  
    async create(createStuffRoleDto: CreateStuffRoleDto) {
      const isExistsRole = await this.RoleRepo.findOne({where: {id:createStuffRoleDto.role_id}})
      if(!isExistsRole){
        return new BadRequestException(`Role_id ${createStuffRoleDto.role_id} is not exists`)
      }

      const isExistsStuff = await this.StuffRepo.findOne({where: {id: createStuffRoleDto.stuff_id}})
      if(!isExistsStuff){
        return new BadRequestException(`stuff_id ${createStuffRoleDto.stuff_id} is not exists`)
      }


      return this.StuffRoleRepo.create(createStuffRoleDto)
    }
  
    async findAll() {
  
      const verib = await this.StuffRoleRepo.findAll({include:{all: true}})
      return verib
    }

    async findAllRoles(id: number) {
      const verib = await this.StuffRoleRepo.findAll({where: {stuff_id: id}, include: {all:true}},)
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.StuffRoleRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateStuffRoleDto: UpdateStuffRoleDto) {
      const verib = await this.StuffRoleRepo.update(updateStuffRoleDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.StuffRoleRepo.destroy({where: {id}})
    }
}
