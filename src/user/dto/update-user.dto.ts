import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, MaxLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @MaxLength(512)
    refreshToken: string
}
