import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('mbtilog')
export class Mbtilog {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: "result_id", type: 'bigint' })
    resultId: number;
    @Column({ name: "sheet_id", type: 'bigint' })
    sheetId: number;

    @Column({ name: "score" })
    score: number;
    @Column({ name: "score_type", length: 16 })
    scoreType: string;

    @Column({ name: "created_at", type: 'bigint' })
    createdAt: string;
    @Column({ name: "updated_at", type: 'bigint', nullable: true })
    updatedAt: string;
    @Column({ name: "deleted_at", type: 'bigint', nullable: true })
    deletedAt: string;
}
