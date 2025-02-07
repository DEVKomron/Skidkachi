import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { District } from './models/district.model';
import { Region } from '../region/model/region.model';

@Module({
  imports: [SequelizeModule.forFeature([District, Region])],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
