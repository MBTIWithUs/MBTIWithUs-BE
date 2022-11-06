import { Test, TestingModule } from '@nestjs/testing';
import { MbtiresultController } from './mbtiresult.controller';
import { MbtiresultService } from './mbtiresult.service';

describe('MbtiresultController', () => {
  let controller: MbtiresultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MbtiresultController],
      providers: [MbtiresultService],
    }).compile();

    controller = module.get<MbtiresultController>(MbtiresultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
