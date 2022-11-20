import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('community_like')
export class CommunityLike {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: "community_id" })
    communityId: number;

    @Column({ name: "user_id" })
    userId: number;

    @Column({ name: "is_liked"})
    isLiked: boolean;
}