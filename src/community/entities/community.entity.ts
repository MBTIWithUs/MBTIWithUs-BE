import { Comment } from "src/comment/entities/comment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("community")
export class Community {

    @OneToMany(() => Comment, (comment) => comment.community)
    comments: Comment[];

    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ name: "creator_id" })
    creatorId: number;
    @Column({ name: "is_anonymous" })
    isAnonymous: boolean;

    @Column({ name: "title", length: 64 })
    title: string;
    @Column({ name: "content", length: 1024 })
    content: string;
    @Column({ name: "tag", length: 16 })
    tag: string;
    @Column({ name: "summary", length: 64})
    summary: string;
    @Column({ name: "thumbnail", nullable: true, length: 256 })
    thumbnail: string;

    @Column({ name: "views" })
    views: number;

    @Column({ name: "created_at", type: 'bigint' })
    createdAt: string;
    @Column({ name: "updated_at", type: 'bigint', nullable: true })
    updatedAt: string;
    @Column({ name: "deleted_at", type: 'bigint', nullable: true })
    deletedAt: string;
}
