import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaintingDto } from './dto/create-painting.dto';
import { UpdatePaintingDto } from './dto/update-painting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Painting } from './entities/painting.entity';

@Injectable()
export class PaintingsService {
  constructor(
    @InjectRepository(Painting)
    private paintingRepository: Repository<Painting>,
  ) {}

  async create(createPaintingDto: CreatePaintingDto): Promise<Painting> {
    const newPaiting = this.paintingRepository.create(createPaintingDto);

    return await this.paintingRepository.save(newPaiting);
  }

  async findAll(): Promise<Painting[]> {
    return await this.paintingRepository.find();
  }

  async findOneById(id: number): Promise<Painting> {
    const painting = await this.paintingRepository.findOneBy({ id });

    if (!painting) {
      throw new NotFoundException(`Painting with ID '${id}' not found.`);
    }

    return painting;
  }

  async update(
    id: number,
    updatePaintingDto: UpdatePaintingDto,
  ): Promise<Painting> {
    const painting = await this.findOneById(id);

    return await this.paintingRepository.save({
      ...painting,
      ...updatePaintingDto,
    });
  }

  async remove(id: number): Promise<Painting> {
    const painting = await this.findOneById(id);

    return this.paintingRepository.remove(painting);
  }
}
