import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountTypeService } from './discount_type.service';
import { CreateDiscountTypeDto } from './dto/create-discount_type.dto';
import { UpdateDiscountTypeDto } from './dto/update-discount_type.dto';

@Controller('discount-type')
export class DiscountTypeController {
  constructor(private readonly discountTypeService: DiscountTypeService) {}

  @Post()
  create(@Body() createDiscountTypeDto: CreateDiscountTypeDto) {
    return this.discountTypeService.create(createDiscountTypeDto);
  }

  @Get()
  findAll() {
    return this.discountTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountTypeDto: UpdateDiscountTypeDto) {
    return this.discountTypeService.update(+id, updateDiscountTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountTypeService.remove(+id);
  }
}
