import { CreateMbtiresultDto } from "../dto/create-mbtiresult.dto";
import { UpdateMbtiresultDto } from "../dto/update-mbtiresult.dto";
import { Mbtiresult } from "../entities/mbtiresult.entity";

export class MbtiresultMapper {

    createDtoToEntity(createDto: CreateMbtiresultDto): Mbtiresult {
        let entity: Mbtiresult = new Mbtiresult();
        entity.targetId = createDto.targetId;
        entity.writerId = createDto.writerId;
        entity.sheetType = createDto.sheetType;
        entity.eScore = createDto.eScore;
        entity.iScore = createDto.iScore;
        entity.sScore = createDto.sScore;
        entity.nScore = createDto.nScore;
        entity.tScore = createDto.tScore;
        entity.fScore = createDto.fScore;
        entity.jScore = createDto.jScore;
        entity.pScore = createDto.pScore;
        entity.createdAt = new Date().getTime() + "";
        return entity;
    }

    updateDtoToEntity(updateDto: UpdateMbtiresultDto, entity: Mbtiresult): void {
        if (Boolean(updateDto.eScore)) entity.eScore = updateDto.eScore;
        if (Boolean(updateDto.iScore)) entity.iScore = updateDto.iScore;
        if (Boolean(updateDto.sScore)) entity.sScore = updateDto.sScore;
        if (Boolean(updateDto.nScore)) entity.nScore = updateDto.nScore;
        if (Boolean(updateDto.tScore)) entity.tScore = updateDto.tScore;
        if (Boolean(updateDto.fScore)) entity.fScore = updateDto.fScore;
        if (Boolean(updateDto.jScore)) entity.jScore = updateDto.jScore;
        if (Boolean(updateDto.pScore)) entity.pScore = updateDto.pScore;
        entity.updatedAt = new Date().getTime() + "";
    }
}