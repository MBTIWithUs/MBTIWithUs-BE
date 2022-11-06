import { IsNotEmpty } from "class-validator";

export class CreateMbtiresultDto {
    // id: number;

    @IsNotEmpty()
    targetId: number;
    @IsNotEmpty()
    writerId: number;

    @IsNotEmpty()
    sheetType: number;

    @IsNotEmpty()
    eScore: number;
    @IsNotEmpty()
    iScore: number;

    @IsNotEmpty()
    sScore: number;
    @IsNotEmpty()
    nScore: number;

    @IsNotEmpty()
    tScore: number;
    @IsNotEmpty()
    fScore: number;

    @IsNotEmpty()
    jScore: number;
    @IsNotEmpty()
    pScore: number;

    // createdAt: string;
    // updatedAt: string;

    // targetDeletedAt: string;
    // writerDeletedAt: string;

    constructor() {
        this.eScore = 0;
        this.iScore = 0;
        this.sScore = 0;
        this.nScore = 0;
        this.tScore = 0;
        this.fScore = 0;
        this.jScore = 0;
        this.pScore = 0;
    }
}
