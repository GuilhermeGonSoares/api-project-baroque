import { PartialType } from '@nestjs/swagger';
import { CreatePainterDto } from './create-painter.dto';

export class UpdatePainterDto extends PartialType(CreatePainterDto) {}
