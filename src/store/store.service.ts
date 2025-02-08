import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Store } from './models/store.model';

@Injectable()
export class StoreService {

  constructor(
    @InjectModel(Store) private readonly storeModel : typeof Store
  ){}

  create(createStoreDto: CreateStoreDto) {
    return this.storeModel.create(createStoreDto)
  }
  
  findAll() {
    return this.storeModel.findAll()
  }
  
  findOne(id: number) {
    return this.storeModel.findByPk()
  }
  
  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeModel.update(updateStoreDto, {where:{id}, returning:true})
    return store[1][0]
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
