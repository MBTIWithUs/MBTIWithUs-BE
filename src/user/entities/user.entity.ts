import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: "nickname", length: 64 })
    nickname: string;

    @Column({ name: "social_id", type: 'bigint' })
    socialId: string;

    @Column({ name: "provider", length: 64 })
    provider: string;

    @Column({ name: "profile_image_url", length: 256, nullable: true })
    profileImageUrl: string;

    @Column({ name: "refresh_token", length: 512, nullable: true })
    refreshToken: string;
}
