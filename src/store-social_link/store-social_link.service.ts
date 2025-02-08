import { Injectable } from '@nestjs/common';
import { CreateStoreSocialLinkDto } from './dto/create-store-social_link.dto';
import { UpdateStoreSocialLinkDto } from './dto/update-store-social_link.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StoreSocialLink } from './models/store-social_link.model';

@Injectable()
export class StoreSocialLinkService {

  constructor(
    @InjectModel(StoreSocialLink) private readonly storeSocialLinkModel: typeof StoreSocialLink
  ) { }

  create(createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
    return this.storeSocialLinkModel.create(createStoreSocialLinkDto)
  }

  findAll() {
    return this.storeSocialLinkModel.findAll()
  }

  findOne(id: number) {
    return this.storeSocialLinkModel.findByPk(id)
  }

  async update(id: number, updateStoreSocialLinkDto: UpdateStoreSocialLinkDto) {

    const socialStoreLink = await this.storeSocialLinkModel.update(updateStoreSocialLinkDto, {
      where: { id },
      returning: true
    })
    return socialStoreLink[1][0]
  }

  remove(id: number) {
    return this.storeSocialLinkModel.destroy({where:{id}})
  }
}
