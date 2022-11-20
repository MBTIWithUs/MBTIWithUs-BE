import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment_like')
export class CommentLike {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: "comment_id" })
    commentId: number;

    @Column({ name: "user_id" })
    userId: number;

    @Column({ name: "is_liked"})
    isLiked: boolean;
}