import { Test, TestingModule } from '@nestjs/testing';
import { PainterService } from './painter.service';

describe('PainterService', () => {
  let service: PainterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PainterService],
    }).compile();

    service = module.get<PainterService>(PainterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
