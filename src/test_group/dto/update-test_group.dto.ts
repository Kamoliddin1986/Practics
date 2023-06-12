import { PartialType } from '@nestjs/mapped-types';
import { CreateTestGroupDto } from './create-test_group.dto';

export class UpdateTestGroupDto extends PartialType(CreateTestGroupDto) {}
