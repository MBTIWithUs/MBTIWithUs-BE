import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('mbtilog')
export class Mbtilog {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'bigint' })
    resultId: number;
    @Column({ type: 'bigint' })
    sheetId: number;

    @Column()
    score: number;
    @Column({ length: 16 })
    scoreType: string;

    @Column({ type: 'bigint' })
    createdAt: string;
    @Column({ type: 'bigint', nullable: true })
    updatedAt: string;
    @Column({ type: 'bigint', nullable: true })
    deletedAt: string;
}
