import { PartialType } from '@nestjs/mapped-types';
import { CreateMbtiresultDto } from './create-mbtiresult.dto';

export class UpdateMbtiresultDto extends PartialType(CreateMbtiresultDto) {}
