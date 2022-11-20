import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMbtilogDto } from 'src/mbtilog/dto/create-mbtilog.dto';
import { UpdateMbtilogDto } from 'src/mbtilog/dto/update-mbtilog.dto';
import { MbtilogService } from 'src/mbtilog/mbtilog.service';
import { MbtiquestionService } from 'src/mbtiquestion/mbtiquestion.service';
import { IsNull, Repository } from 'typeorm';
import { CreateMbtiresultQuestionsDto } from './dto/create-mbtiresult-questions.dto';
import { CreateMbtiresultDto } from './dto/create-mbtiresult.dto';
import { Mbtiselection } from './dto/mbtiselection.dto';
import { UpdateMbtiresultQuestionsDto } from './dto/update-mbtiresult-questions.dto';
import { UpdateMbtiresultDto } from './dto/update-mbtiresult.dto';
import { Mbtiresult } from './entities/mbtiresult.entity';
import { MbtiresultMapper } from './util/mbtiresult.mapper';

@Injectable()
export class MbtiresultService {

  constructor(
    @InjectRepository(Mbtiresult) private mbtiresultRepository: Repository<Mbtiresult>,
    private readonly mbtiresultMapper: MbtiresultMapper,
    @Inject(forwardRef(() => MbtilogService))
    private readonly mbtilogService: MbtilogService,
    private readonly mbtiquestionService: MbtiquestionService
  ) { }

  async create(createMbtiresultQuestionsDto: CreateMbtiresultQuestionsDto, writerId: number): Promise<Mbtiresult> {
    let mbtiselections = createMbtiresultQuestionsDto.input;
    let createMbtiresultDto: CreateMbtiresultDto = await this.calcScores(mbtiselections);
    createMbtiresultDto.writerId = writerId;
    createMbtiresultDto.targetId = createMbtiresultQuestionsDto.targetId;
    let mbtiresult: Mbtiresult = this.mbtiresultMapper.createDtoToEntity(createMbtiresultDto);
    let created = await this.mbtiresultRepository.save(mbtiresult);

    let createMbtilogDtos = [];
    for (let mbtiselection of mbtiselections) {
      let createMbtilogDto: CreateMbtilogDto = new CreateMbtilogDto();
      createMbtilogDto.resultId = created.id;
      createMbtilogDto.score = mbtiselection.score;
      createMbtilogDto.scoreType = mbtiselection.scoreType;
      createMbtilogDto.sheetId = mbtiselection.id;
      createMbtilogDtos.push(createMbtilogDto);
    }
    await this.mbtilogService.createAll(createMbtilogDtos);

    return created;
  }

  private async calcScores(mbtiselections: Mbtiselection[]): Promise<CreateMbtiresultDto> {
    let createMbtiresultDto: CreateMbtiresultDto = new CreateMbtiresultDto();
    let sheetType = (await this.mbtiquestionService.findById(mbtiselections[0].id)).type;
    let questions = await this.mbtiquestionService.findByType(sheetType);
    let questionMap = {};
    for (let question of questions) {
      questionMap[question.id] = question;
    }

    let count: number = 0;
    for (let mbtiselection of mbtiselections) {
      if (!Boolean(questionMap[mbtiselection.id + ""])) throw new BadRequestException("The values ​​submitted in the form are not the same question sheet type.");
      let question = questionMap[mbtiselection.id];
      if (mbtiselection.scoreType == 'left') {
        createMbtiresultDto[question.leftAnswerType] += (+mbtiselection.score);
      }
      else if (mbtiselection.scoreType == 'right') {
        createMbtiresultDto[question.rightAnswerType] += (+mbtiselection.score);
      }
      else {
        throw new BadRequestException("Some score type in values ​​submitted in the form are not valid. Must 'left' or 'right'");
      }

      count++;
    }

    if (count != questions.length) {
      throw new BadRequestException("The number of values ​​submitted in the form is not valid.");
    }
    createMbtiresultDto.sheetType = questions[0].type;
    return createMbtiresultDto;
  }

  async findOneFromTarget(id: number): Promise<Mbtiresult> {
    return await this.mbtiresultRepository.findOneByOrFail({
      id: id, targetDeletedAt: IsNull()
    });
  }

  async findOneFromWriter(id: number): Promise<Mbtiresult> {
    return await this.mbtiresultRepository.findOneByOrFail({
      id: id, writerDeletedAt: IsNull()
    });
  }

  async findOne(id: number): Promise<Mbtiresult> {
    return await this.mbtiresultRepository.findOneByOrFail({
      id: id
    });
  }

  async findByWriterId(writerId: number): Promise<Mbtiresult[]> {
    let mbtiresults: Mbtiresult[] = await this.mbtiresultRepository.find({
      where: {
        writerId: writerId, writerDeletedAt: IsNull()
      },
      order: {
        createdAt: "ASC"
      }
    });
    return mbtiresults;
  }

  async findByTargetId(targetId: number): Promise<Mbtiresult[]> {
    let mbtiresults: Mbtiresult[] = await this.mbtiresultRepository.find({
      where: {
        targetId: targetId, targetDeletedAt: IsNull(),
      },
      order: {
        createdAt: "ASC"
      }
    });
    return mbtiresults;
  }

  async update(id: number, updateMbtiresultQuestionsDto: UpdateMbtiresultQuestionsDto): Promise<Mbtiresult> {
    let mbtiselections: Mbtiselection[] = updateMbtiresultQuestionsDto.input;
    let updateMbtiresultDto: UpdateMbtiresultDto = await this.calcScores(mbtiselections);
    let mbtiresult: Mbtiresult = await this.findOne(id);
    this.mbtiresultMapper.updateDtoToEntity(updateMbtiresultDto, mbtiresult)
    let updated = await this.mbtiresultRepository.save(mbtiresult);

    let updateMbtilogDtos = [];
    for (let i in mbtiselections) {
      let mbtiselection = mbtiselections[i];
      let updateMbtilogDto: UpdateMbtilogDto = new UpdateMbtilogDto();
      updateMbtilogDto.resultId = updated.id;
      updateMbtilogDto.score = mbtiselection.score;
      updateMbtilogDto.scoreType = mbtiselection.scoreType;
      updateMbtilogDto.sheetId = mbtiselection.id;
      updateMbtilogDtos.push(updateMbtilogDto);
    }
    await this.mbtilogService.updateAll(id, updateMbtilogDtos);

    return updated;
  }

  async removeOneFromTarget(id: number): Promise<void> {
    let mbtiresult: Mbtiresult = await this.findOneFromTarget(id);
    mbtiresult.targetDeletedAt = new Date().getTime() + "";
    await this.mbtiresultRepository.save(mbtiresult);
  }

  async removeOneFromWriter(id: number): Promise<void> {
    let mbtiresult: Mbtiresult = await this.findOneFromWriter(id);
    mbtiresult.writerDeletedAt = new Date().getTime() + "";
    await this.mbtiresultRepository.save(mbtiresult);
  }
}