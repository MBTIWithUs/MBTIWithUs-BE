import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mbtiquestion } from './entities/mbtiquestion.entity';

@Injectable()
export class MbtiquestionService {

  constructor(
    @InjectRepository(Mbtiquestion) private mbtiquestionRepository: Repository<Mbtiquestion>
  ) {}

  async findByType(type: number): Promise<Mbtiquestion[]> {
    let mbtiquestions = await this.mbtiquestionRepository.findBy({
      type: type
    });
    return mbtiquestions;
  }

  async findById(id: number): Promise<Mbtiquestion> {
    let mbtiquestions = await this.mbtiquestionRepository.findOneByOrFail({
      id: id
    });
    return mbtiquestions;
  }
}
