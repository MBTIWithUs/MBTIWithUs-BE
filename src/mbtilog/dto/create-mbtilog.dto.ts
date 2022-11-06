import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateMbtilogDto {

    // id: number;

    @IsNotEmpty()
    resultId: number;

    @IsNotEmpty()
    sheetId: number;

    @IsNotEmpty()
    score: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(16)
    scoreType: string;

    // createdAt: number;
    // updatedAt: number;
    // deletedAt: number;
}
