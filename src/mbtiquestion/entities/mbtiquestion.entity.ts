import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Mbtiquestion')
export class Mbtiquestion {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    type: number;

    @Column({ length: 64 })
    question: string;

    @Column({ length: 64 })
    leftAnswer: string;
    @Column({ length: 16 })
    leftAnswerType: string;

    @Column({ length: 64 })
    rightAnswer: string;
    @Column({ length: 16 })
    rightAnswerType: string;
}
