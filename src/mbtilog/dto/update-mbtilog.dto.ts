import { PartialType } from '@nestjs/mapped-types';
import { CreateMbtilogDto } from './create-mbtilog.dto';

export class UpdateMbtilogDto extends PartialType(CreateMbtilogDto) {
}
