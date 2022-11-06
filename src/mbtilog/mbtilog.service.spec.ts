import { Test, TestingModule } from '@nestjs/testing';
import { MbtilogService } from './mbtilog.service';

describe('MbtilogService', () => {
  let service: MbtilogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MbtilogService],
    }).compile();

    service = module.get<MbtilogService>(MbtilogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
