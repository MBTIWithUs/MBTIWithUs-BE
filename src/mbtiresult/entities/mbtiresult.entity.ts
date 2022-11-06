import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Mbtiresult')
export class Mbtiresult {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    targetId: number;
    @Column()
    writerId: number;

    @Column()
    sheetType: number;

    @Column()
    eScore: number;
    @Column()
    iScore: number;

    @Column()
    sScore: number;
    @Column()
    nScore: number;

    @Column()
    tScore: number;
    @Column()
    fScore: number;

    @Column()
    jScore: number;
    @Column()
    pScore: number;

    @Column({ type: 'bigint' })
    createdAt: string;
    @Column({ type: 'bigint', nullable: true })
    updatedAt: string;

    @Column({ type: 'bigint', nullable: true })
    targetDeletedAt: string;
    @Column({ type: 'bigint', nullable: true })
    writerDeletedAt: string;
}
