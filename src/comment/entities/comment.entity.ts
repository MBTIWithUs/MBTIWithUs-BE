import { Community } from "src/community/entities/community.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class Comment {

    @ManyToOne(() => Community, (community) => community.comments)
    @JoinColumn({ name: "community_id" })
    community: Community

    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ name: "creator_id" })
    creatorId: number;
    @Column({ name: "is_anonymous" })
    isAnonymous: boolean;
    @Column({ name: "parent_comment_id", nullable: true })
    parentCommentId: number;

    @Column({ name: "content", length: 256 })
    content: string;

    @Column({ name: "created_at", type: 'bigint' })
    createdAt: string;
    @Column({ name: "updated_at", type: 'bigint', nullable: true })
    updatedAt: string;
    @Column({ name: "deleted_at", type: 'bigint', nullable: true })
    deletedAt: string;
}
