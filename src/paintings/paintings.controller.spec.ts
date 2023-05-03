import { Test, TestingModule } from '@nestjs/testing';
import { PaintingsController } from './paintings.controller';
import { PaintingsService } from './paintings.service';

describe('PaintingsController', () => {
  let controller: PaintingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaintingsController],
      providers: [PaintingsService],
    }).compile();

    controller = module.get<PaintingsController>(PaintingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
