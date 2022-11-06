import { Test, TestingModule } from '@nestjs/testing';
import { MbtiquestionService } from './mbtiquestion.service';

describe('MbtiquestionService', () => {
  let service: MbtiquestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MbtiquestionService],
    }).compile();

    service = module.get<MbtiquestionService>(MbtiquestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
