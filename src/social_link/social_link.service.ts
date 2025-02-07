import { Injectable } from '@nestjs/common';
import { CreateSocialLinkDto } from './dto/create-social_link.dto';
import { UpdateSocialLinkDto } from './dto/update-social_link.dto';

@Injectable()
export class SocialLinkService {
  create(createSocialLinkDto: CreateSocialLinkDto) {
    return 'This action adds a new socialLink';
  }

  findAll() {
    return `This action returns all socialLink`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialLink`;
  }

  update(id: number, updateSocialLinkDto: UpdateSocialLinkDto) {
    return `This action updates a #${id} socialLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} socialLink`;
  }
}
