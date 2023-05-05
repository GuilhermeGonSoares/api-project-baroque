import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaintingsModule } from './paintings/paintings.module';
import { dataSourceOptions } from 'db/data-source';
import { ChurchModule } from './church/church.module';
import { TagModule } from './tag/tag.module';
import { PainterModule } from './painter/painter.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PaintingsModule,
    ChurchModule,
    TagModule,
    PainterModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
