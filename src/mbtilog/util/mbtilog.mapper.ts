import { CreateMbtilogDto } from "../dto/create-mbtilog.dto";
import { UpdateMbtilogDto } from "../dto/update-mbtilog.dto";
import { Mbtilog } from "../entities/mbtilog.entity";
import { Injectable } from '@nestjs/common';

@Injectable()
export class MbtilogMapper {

    createDtoToEntity(createDto: CreateMbtilogDto): Mbtilog {
        let mbtilog: Mbtilog = new Mbtilog(); 
        mbtilog.resultId = createDto.resultId;
        mbtilog.sheetId = createDto.sheetId;
        mbtilog.score = createDto.score;
        mbtilog.scoreType = createDto.scoreType;
        mbtilog.createdAt = new Date().getTime() + "";
        return mbtilog;
    }

    updateDtoToEntity(updateDto: UpdateMbtilogDto, entity: Mbtilog) {
        if (Boolean(updateDto.score)) entity.score = updateDto.score;
        if (Boolean(updateDto.scoreType)) entity.scoreType = updateDto.scoreType;
        entity.updatedAt = new Date().getTime() + "";
    }
}