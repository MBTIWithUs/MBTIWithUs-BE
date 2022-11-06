import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateMbtilogDto } from './dto/create-mbtilog.dto';
import { UpdateMbtilogDto } from './dto/update-mbtilog.dto';
import { Mbtilog } from './entities/mbtilog.entity';
import { MbtilogMapper } from './util/mbtilog.mapper';

@Injectable()
export class MbtilogService {

  constructor(
    @InjectRepository(Mbtilog) private mbtilogRepository: Repository<Mbtilog>,
    private readonly mbtilogMapper: MbtilogMapper,
  ) {}

  async create(createMbtilogDto: CreateMbtilogDto): Promise<number> {
    let mbtilog: Mbtilog = this.mbtilogMapper.createDtoToEntity(createMbtilogDto);
    let created: Mbtilog = await this.mbtilogRepository.save(mbtilog);
    return created.id;
  }

  async createAll(createMbtilogDtos: CreateMbtilogDto[]): Promise<void> {
    let mbtilogs = [];

    for (let i in createMbtilogDtos) {
      let createMbtilogDto: CreateMbtilogDto = createMbtilogDtos[i];
      mbtilogs.push(this.mbtilogMapper.createDtoToEntity(createMbtilogDto));
    }

    await this.mbtilogRepository.save(mbtilogs);
  }

  async findByResultId(resultId: number): Promise<Mbtilog[]> {
    let mbtilogs: Mbtilog[] = await this.mbtilogRepository.findBy({
      resultId: resultId, deletedAt: IsNull() });
    return mbtilogs;
  }

  async findOne(id: number): Promise<Mbtilog> {
    return await this.mbtilogRepository.findOneByOrFail({
      id: id, deletedAt: IsNull()
    });
  }

  async update(id: number, updateMbtilogDto: UpdateMbtilogDto): Promise<number> {
    let mbtilog: Mbtilog = await this.findOne(id);
    this.mbtilogMapper.updateDtoToEntity(updateMbtilogDto, mbtilog);
    let updated: Mbtilog = await this.mbtilogRepository.save(mbtilog);
    return updated.id;
  }

  async updateAll(resultId: number, updateMbtilogDtos: UpdateMbtilogDto[]): Promise<void> {
    let mbtilogs = await this.findByResultId(resultId);
    let mbtilogMap = {};
    for (let mbtilog of mbtilogs) {
      mbtilogMap[mbtilog.sheetId] = mbtilog;
    }

    for (let updateMbtilogDto of updateMbtilogDtos) {
      let mbtilog: Mbtilog = mbtilogMap[updateMbtilogDto.sheetId];
      this.mbtilogMapper.updateDtoToEntity(updateMbtilogDto, mbtilog);
      await this.mbtilogRepository.save(mbtilog);
    }
  }

  async remove(id: number): Promise<void> {
    let mbtilog: Mbtilog = await this.findOne(id);
    mbtilog.deletedAt = new Date().getTime() + "";
    await this.mbtilogRepository.save(mbtilog);
  }

  async removeByResultId(resultId: number): Promise<void> {
    let mbtilogs: Mbtilog[] = await this.findByResultId(resultId);
    for (let mbtilog of mbtilogs) {
      await this.remove(mbtilog.id);
    }
  }
}
