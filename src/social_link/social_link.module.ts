import { Module } from '@nestjs/common';
import { SocialLinkService } from './social_link.service';
import { SocialLinkController } from './social_link.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialLink } from './models/social_link.model';

@Module({
  imports:[SequelizeModule.forFeature([SocialLink])],
  controllers: [SocialLinkController],
  providers: [SocialLinkService],
})
export class SocialLinkModule {}
