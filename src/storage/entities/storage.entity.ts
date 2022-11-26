import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('storage')
export class Storage {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: "url", length: 256 })
    url: string;
}
