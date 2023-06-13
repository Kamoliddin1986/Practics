import { Sequelize } from 'sequelize';
import { StuffRole } from './models/stuff_role.model';
import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStuffRoleDto } from './dto/create-stuff_role.dto';
import { UpdateStuffRoleDto } from './dto/update-stuff_role.dto';
import { InjectModel } from "@nestjs/Sequelize";
import { Role } from '../role/models/role.model';
import { Stuff } from '../stuff/models/stuff.model';
import { RoleService } from '../role/role.service';
import { StuffModule } from '../stuff/stuff.module';
import { StuffService } from '../stuff/stuff.service';
import { log } from 'console';
@Injectable()
export class StuffRoleService {
  constructor(
    @InjectModel(StuffRole) private StuffRoleRepo: typeof StuffRole,
    private  roleService: RoleService,
    @Inject(forwardRef(()=> StuffService)) 
    private readonly stuffService: StuffService,

    ) {}
  
    async create(createStuffRoleDto: CreateStuffRoleDto) {
      console.log(createStuffRoleDto);
      
      const isExistsRole = await this.roleService.findOne(createStuffRoleDto.role_id)
      if(!isExistsRole){
        return new BadRequestException(`Role_id ${createStuffRoleDto.role_id} is not exists`)
      }

      const isExistsStuff = await this.stuffService.findOne(createStuffRoleDto.stuff_id)
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
