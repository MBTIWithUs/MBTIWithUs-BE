import { Test, TestingModule } from '@nestjs/testing';
import { MbtiresultService } from './mbtiresult.service';

describe('MbtiresultService', () => {
  let service: MbtiresultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MbtiresultService],
    }).compile();

    service = module.get<MbtiresultService>(MbtiresultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
