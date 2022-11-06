import { Test, TestingModule } from '@nestjs/testing';
import { MbtilogController } from './mbtilog.controller';
import { MbtilogService } from './mbtilog.service';

describe('MbtilogController', () => {
  let controller: MbtilogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MbtilogController],
      providers: [MbtilogService],
    }).compile();

    controller = module.get<MbtilogController>(MbtilogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
