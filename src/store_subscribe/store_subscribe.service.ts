import { Injectable } from '@nestjs/common';
import { CreateStoreSubscribeDto } from './dto/create-store_subscribe.dto';
import { UpdateStoreSubscribeDto } from './dto/update-store_subscribe.dto';

@Injectable()
export class StoreSubscribeService {
  create(createStoreSubscribeDto: CreateStoreSubscribeDto) {
    return 'This action adds a new storeSubscribe';
  }

  findAll() {
    return `This action returns all storeSubscribe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeSubscribe`;
  }

  update(id: number, updateStoreSubscribeDto: UpdateStoreSubscribeDto) {
    return `This action updates a #${id} storeSubscribe`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeSubscribe`;
  }
}
