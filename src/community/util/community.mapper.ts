import { CreateCommunityDto } from "../dto/create-community.dto";
import { UpdateCommunityDto } from "../dto/update-community.dto";
import { Community } from "../entities/community.entity";

export class CommunityMapper {

    createDtoToEntity(createDto: CreateCommunityDto): Community {
        let entity: Community = new Community;
        entity.isAnonymous = createDto.isAnonymous;
        entity.title = createDto.title
        entity.content = createDto.content;
        entity.views = 0;
        entity.createdAt = new Date().getTime() + "";
        return entity;
    }

    updateDtoToEntity(updateDto: UpdateCommunityDto, entity: Community): void {
        if (Boolean(updateDto.title)) entity.title = updateDto.title;
        if (Boolean(updateDto.content)) entity.content = updateDto.content;
        entity.updatedAt = new Date().getTime() + "";
    }
}