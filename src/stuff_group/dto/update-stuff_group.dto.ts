import { PartialType } from '@nestjs/mapped-types';
import { CreateStuffGroupDto } from './create-stuff_group.dto';

export class UpdateStuffGroupDto extends PartialType(CreateStuffGroupDto) {}
