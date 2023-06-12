import { PartialType } from '@nestjs/mapped-types';
import { CreateStuffSubjectDto } from './create-stuff_subject.dto';

export class UpdateStuffSubjectDto extends PartialType(CreateStuffSubjectDto) {}
