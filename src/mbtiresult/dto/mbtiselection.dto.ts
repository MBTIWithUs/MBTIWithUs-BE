import { IsNotEmpty, MaxLength } from "class-validator";

export class Mbtiselection {

    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    score: number;
    @IsNotEmpty()
    @MaxLength(16)
    scoreType: string;
}