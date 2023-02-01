import { Test, TestingModule } from '@nestjs/testing';
import { FailureController } from './failure.controller';
import { FailureService } from './failure.service';

describe('FailureController', () => {
  let controller: FailureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailureController],
      providers: [FailureService],
    }).compile();

    controller = module.get<FailureController>(FailureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
