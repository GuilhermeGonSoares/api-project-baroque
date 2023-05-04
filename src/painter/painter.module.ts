import { Module } from '@nestjs/common';
import { PainterService } from './painter.service';
import { PainterController } from './painter.controller';

@Module({
  controllers: [PainterController],
  providers: [PainterService]
})
export class PainterModule {}
