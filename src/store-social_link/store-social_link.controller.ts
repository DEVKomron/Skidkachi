import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreSocialLinkService } from './store-social_link.service';
import { CreateStoreSocialLinkDto } from './dto/create-store-social_link.dto';
import { UpdateStoreSocialLinkDto } from './dto/update-store-social_link.dto';

@Controller('store-social-link')
export class StoreSocialLinkController {
  constructor(private readonly storeSocialLinkService: StoreSocialLinkService) {}

  @Post()
  create(@Body() createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
    return this.storeSocialLinkService.create(createStoreSocialLinkDto);
  }

  @Get()
  findAll() {
    return this.storeSocialLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeSocialLinkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreSocialLinkDto: UpdateStoreSocialLinkDto) {
    return this.storeSocialLinkService.update(+id, updateStoreSocialLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeSocialLinkService.remove(+id);
  }
}
