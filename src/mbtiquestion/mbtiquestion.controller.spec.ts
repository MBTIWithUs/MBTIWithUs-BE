import { Test, TestingModule } from '@nestjs/testing';
import { MbtiquestionController } from './mbtiquestion.controller';
import { MbtiquestionService } from './mbtiquestion.service';

describe('MbtiquestionController', () => {
  let controller: MbtiquestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MbtiquestionController],
      providers: [MbtiquestionService],
    }).compile();

    controller = module.get<MbtiquestionController>(MbtiquestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
