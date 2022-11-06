import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UserMapper {
    createDtoToEntity(createDto: CreateUserDto): User {
        let entity: User = new User();
        entity.nickname = createDto.nickname;
        entity.socialId = createDto.socialId;
        entity.provider = createDto.provider;
        if (Boolean(createDto.profileImageUrl)) entity.profileImageUrl = createDto.profileImageUrl;
        return entity;
    }

    updateDtoToEntity(updateDto: UpdateUserDto, entity: User) {
        if (Boolean(updateDto.nickname)) entity.nickname = updateDto.nickname;
        if (Boolean(updateDto.profileImageUrl)) entity.profileImageUrl = updateDto.profileImageUrl;
    }
}