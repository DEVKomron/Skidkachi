import { Injectable } from '@nestjs/common';
import { CreateSocialLinkDto } from './dto/create-social_link.dto';
import { UpdateSocialLinkDto } from './dto/update-social_link.dto';
import { SocialLink } from './models/social_link.model';
import { InjectModel } from '@nestjs/sequelize';
import { SocialLinkModule } from './social_link.module';

@Injectable()
export class SocialLinkService {
  constructor(
    @InjectModel(SocialLink) private readonly socialLinkModel : typeof SocialLink
  ){}
  create(createSocialLinkDto: CreateSocialLinkDto) {
    return this.socialLinkModel.create(createSocialLinkDto)
  }

  findAll() {
    return this.socialLinkModel.findAll()
  }

  findOne(id: number) {
    return this.socialLinkModel.findByPk(id)
  }

  update(id: number, updateSocialLinkDto: UpdateSocialLinkDto) {
    return this.socialLinkModel.update(updateSocialLinkDto, {where:{id}, returning:true})
  }

  remove(id: number) {
    return this.socialLinkModel.destroy({where:{id}})
  }
}
