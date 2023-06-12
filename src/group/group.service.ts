import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './models/group.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private GroupRepo: typeof Group
    ) {}
  
    create(createGroupDto: CreateGroupDto) {
      return this.GroupRepo.create(createGroupDto)
    }
  
    async findAll() {
  
      const verib = await this.GroupRepo.findAll({include:{all: true}})
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.GroupRepo.findByPk(id,{include:{all: true}})
      return verib
    }

  
  
    async update(id: number, updateGroupDto: UpdateGroupDto) {
      const verib = await this.GroupRepo.update(updateGroupDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.GroupRepo.destroy({where: {id}})
    }
}
