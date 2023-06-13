import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStuffGroupDto } from './dto/create-stuff_group.dto';
import { UpdateStuffGroupDto } from './dto/update-stuff_group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StuffGroup } from './models/stuff_group.model';
import { GroupService } from '../group/group.service';
import { StuffService } from '../stuff/stuff.service';

@Injectable()
export class StuffGroupService {
  constructor(
    @InjectModel(StuffGroup) private StuffGroupRepo: typeof StuffGroup,
    private  groupService: GroupService,
    private readonly stuffService: StuffService,

    ) {}
  
    async create(createStuffGroupDto: CreateStuffGroupDto) {
      const isExistsGroup = await this.groupService.findOne(createStuffGroupDto.group_id)
      if(!isExistsGroup){
        return new BadRequestException(`Group_id ${createStuffGroupDto.group_id} is not exists`)
      }

      const isExistsStuff = await this.stuffService.findOne(createStuffGroupDto.stuff_id)
      if(!isExistsStuff){
        return new BadRequestException(`stuff_id ${createStuffGroupDto.stuff_id} is not exists`)
      }


      return this.StuffGroupRepo.create(createStuffGroupDto)
    }
  
    async findAll() {
  
      const verib = await this.StuffGroupRepo.findAll({include:{all: true}})
      return verib
    }

    async findAllRoles(id: number) {
      const verib = await this.StuffGroupRepo.findAll({where: {stuff_id: id}, include: {all:true}},)
      return verib
    }
  
    async findOne(id: number) {
      const verib = await this.StuffGroupRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateStuffGroupDto: UpdateStuffGroupDto) {
      const verib = await this.StuffGroupRepo.update(updateStuffGroupDto, {where: {id}})
      return verib
    }
  
    remove(id: number) {
      return this.StuffGroupRepo.destroy({where: {id}})
    }
}
