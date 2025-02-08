import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreSubscribeService } from './store_subscribe.service';
import { CreateStoreSubscribeDto } from './dto/create-store_subscribe.dto';
import { UpdateStoreSubscribeDto } from './dto/update-store_subscribe.dto';

@Controller('store-subscribe')
export class StoreSubscribeController {
  constructor(private readonly storeSubscribeService: StoreSubscribeService) {}

  @Post()
  create(@Body() createStoreSubscribeDto: CreateStoreSubscribeDto) {
    return this.storeSubscribeService.create(createStoreSubscribeDto);
  }

  @Get()
  findAll() {
    return this.storeSubscribeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeSubscribeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreSubscribeDto: UpdateStoreSubscribeDto) {
    return this.storeSubscribeService.update(+id, updateStoreSubscribeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeSubscribeService.remove(+id);
  }
}
