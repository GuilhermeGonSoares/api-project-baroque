import { Test, TestingModule } from '@nestjs/testing';
import { PainterController } from './painter.controller';
import { PainterService } from './painter.service';

describe('PainterController', () => {
  let controller: PainterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PainterController],
      providers: [PainterService],
    }).compile();

    controller = module.get<PainterController>(PainterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
