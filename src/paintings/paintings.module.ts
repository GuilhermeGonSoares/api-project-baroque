import { Module } from '@nestjs/common';
import { PaintingsService } from './paintings.service';
import { PaintingsController } from './paintings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Painting } from './entities/painting.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Painting])],
  controllers: [PaintingsController],
  providers: [PaintingsService],
})
export class PaintingsModule {}
