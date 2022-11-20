import { IsNotEmpty, Length } from "class-validator";

export class CreateCommunityDto {

    // comments: Comment[];

    // id: number;
    // creatorId: number;
    @IsNotEmpty()
    isAnonymous: boolean;

    @IsNotEmpty()
    @Length(5, 64)
    title: string;
    @IsNotEmpty()
    @Length(10, 1024)
    content: string;

    // views: number;
    // likes: number;
    // hates: number;

    // createdAt: string;
    // updatedAt: string;
    // deletedAt: string;
}
