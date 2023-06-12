import { PartialType } from '@nestjs/mapped-types';
import { CreateTestResultDto } from './create-test_result.dto';

export class UpdateTestResultDto extends PartialType(CreateTestResultDto) {}
