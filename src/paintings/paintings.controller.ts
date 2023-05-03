import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PaintingsService } from './paintings.service';
import { CreatePaintingDto } from './dto/create-painting.dto';
import { UpdatePaintingDto } from './dto/update-painting.dto';

@Controller('paintings')
export class PaintingsController {
  constructor(private readonly paintingsService: PaintingsService) {}

  @Post()
  create(@Body() createPaintingDto: CreatePaintingDto) {
    return this.paintingsService.create(createPaintingDto);
  }

  @Get()
  findAll() {
    return this.paintingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paintingsService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaintingDto: UpdatePaintingDto,
  ) {
    return this.paintingsService.update(+id, updatePaintingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paintingsService.remove(+id);
  }
}
