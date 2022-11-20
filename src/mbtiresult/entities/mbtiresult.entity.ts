import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('mbtiresult')
export class Mbtiresult {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: "target_id", })
    targetId: number;
    @Column({ name: "writer_id", })
    writerId: number;

    @Column({ name: "sheet_type", })
    sheetType: number;

    @Column({ name: "e_score", })
    eScore: number;
    @Column({ name: "i_score", })
    iScore: number;

    @Column({ name: "s_score", })
    sScore: number;
    @Column({ name: "n_score", })
    nScore: number;

    @Column({ name: "t_score", })
    tScore: number;
    @Column({ name: "f_score", })
    fScore: number;

    @Column({ name: "j_score", })
    jScore: number;
    @Column({ name: "p_score", })
    pScore: number;

    @Column({ name: "created_at", type: 'bigint' })
    createdAt: string;
    @Column({ name: "update_at", type: 'bigint', nullable: true })
    updatedAt: string;

    @Column({ name: "target_deleted_at", type: 'bigint', nullable: true })
    targetDeletedAt: string;
    @Column({ name: "writer_deleted_at", type: 'bigint', nullable: true })
    writerDeletedAt: string;
}
