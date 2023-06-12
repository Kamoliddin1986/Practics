import { Injectable } from '@nestjs/common';
import { CreateStuffGroupDto } from './dto/create-stuff_group.dto';
import { UpdateStuffGroupDto } from './dto/update-stuff_group.dto';

@Injectable()
export class StuffGroupService {
  create(createStuffGroupDto: CreateStuffGroupDto) {
    return 'This action adds a new stuffGroup';
  }

  findAll() {
    return `This action returns all stuffGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stuffGroup`;
  }

  update(id: number, updateStuffGroupDto: UpdateStuffGroupDto) {
    return `This action updates a #${id} stuffGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} stuffGroup`;
  }
}
