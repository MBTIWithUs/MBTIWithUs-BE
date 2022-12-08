import { IsNotEmpty, Length, max, min } from "class-validator";
import { Community } from "src/community/entities/community.entity";

export class CreateCommentDto {

    // community: Community
    @IsNotEmpty()
    communityId: number;
    parentCommentId: number;

    // id: number;
    // creatorId: number;
    @IsNotEmpty()
    isAnonymous: boolean;

    @IsNotEmpty()
    @Length(2, 256)
    content: string;

    // likes: number;
    // hates: number;

    // createdAt: string;
    // updatedAt: string;
    // deletedAt: string;
}
