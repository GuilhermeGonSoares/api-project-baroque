import { Injectable } from '@nestjs/common';
import { CreatePainterDto } from './dto/create-painter.dto';
import { UpdatePainterDto } from './dto/update-painter.dto';

@Injectable()
export class PainterService {
  create(createPainterDto: CreatePainterDto) {
    return 'This action adds a new painter';
  }

  findAll() {
    return `This action returns all painter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} painter`;
  }

  update(id: number, updatePainterDto: UpdatePainterDto) {
    return `This action updates a #${id} painter`;
  }

  remove(id: number) {
    return `This action removes a #${id} painter`;
  }
}
