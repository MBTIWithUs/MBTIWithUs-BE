import { Community } from "src/community/entities/community.entity";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Comment } from "../entities/comment.entity";

export class CommentMapper {
    
    createDtoToEntity(createDto: CreateCommentDto): Comment {
        let entity: Comment = new Comment;
        entity.community = new Community();
        entity.community.id = createDto.communityId;
        entity.parentCommentId = createDto.parentCommentId;
        entity.isAnonymous = createDto.isAnonymous;
        entity.content = createDto.content;
        entity.likes = 0;
        entity.createdAt = new Date().getTime() + "";
        return entity;
    }

    updateDtoToEntity(updateDto: UpdateCommentDto, entity: Comment): void {
        if (Boolean(updateDto.content)) entity.content = updateDto.content;
        entity.updatedAt = new Date().getTime() + "";
    }
}