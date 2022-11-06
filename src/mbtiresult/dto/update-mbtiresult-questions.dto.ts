import { IsNotEmpty } from "class-validator";
import { Mbtiselection } from "./mbtiselection.dto";

export class UpdateMbtiresultQuestionsDto {

    @IsNotEmpty()
    input: Mbtiselection[];
}