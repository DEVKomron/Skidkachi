import { Module } from '@nestjs/common';
import { DiscountTypeService } from './discount_type.service';
import { DiscountTypeController } from './discount_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscountType } from './models/discount_type.model';

@Module({
  imports:[SequelizeModule.forFeature([DiscountType])],
  controllers: [DiscountTypeController],
  providers: [DiscountTypeService],
})
export class DiscountTypeModule {}
