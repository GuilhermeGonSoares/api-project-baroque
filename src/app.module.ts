import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaintingsModule } from './paintings/paintings.module';
import { dataSourceOptions } from 'db/data-source';
import { ChurchModule } from './church/church.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PaintingsModule,
    ChurchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
