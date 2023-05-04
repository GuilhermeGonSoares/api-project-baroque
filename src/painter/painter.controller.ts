import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PainterService } from './painter.service';
import { CreatePainterDto } from './dto/create-painter.dto';
import { UpdatePainterDto } from './dto/update-painter.dto';

@Controller('painter')
export class PainterController {
  constructor(private readonly painterService: PainterService) {}

  @Post()
  create(@Body() createPainterDto: CreatePainterDto) {
    return this.painterService.create(createPainterDto);
  }

  @Get()
  findAll() {
    return this.painterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.painterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePainterDto: UpdatePainterDto) {
    return this.painterService.update(+id, updatePainterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.painterService.remove(+id);
  }
}
