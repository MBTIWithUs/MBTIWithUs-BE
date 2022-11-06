import { IsNotEmpty } from "class-validator";
import { Mbtiselection } from "./mbtiselection.dto";

export class CreateMbtiresultQuestionsDto {

    @IsNotEmpty()
    targetId: number;

    @IsNotEmpty()
    input: Mbtiselection[];
}