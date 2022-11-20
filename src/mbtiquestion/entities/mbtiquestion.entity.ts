import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('mbtiquestion')
export class Mbtiquestion {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({ name: "type", })
    type: number;

    @Column({ name: "question", length: 64 })
    question: string;

    @Column({ name: "left_answer", length: 64 })
    leftAnswer: string;
    @Column({ name: "left_answer_type", length: 16 })
    leftAnswerType: string;

    @Column({ name: "right_answer", length: 64 })
    rightAnswer: string;
    @Column({ name: "right_answer_type", length: 16 })
    rightAnswerType: string;
}
