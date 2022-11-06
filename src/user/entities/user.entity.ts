import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 64 })
    nickname: string;

    @Column({ type: 'bigint' })
    socialId: string;

    @Column({ length: 64 })
    provider: string;

    @Column({ length: 256, nullable: true })
    profileImageUrl: string;

    @Column({ length: 512, nullable: true })
    refreshToken: string;
}
