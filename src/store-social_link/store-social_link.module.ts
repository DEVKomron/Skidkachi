import { Module } from '@nestjs/common';
import { StoreSocialLinkService } from './store-social_link.service';
import { StoreSocialLinkController } from './store-social_link.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreSocialLink } from './models/store-social_link.model';

@Module({
  imports: [SequelizeModule.forFeature([StoreSocialLink])],
  controllers: [StoreSocialLinkController],
  providers: [StoreSocialLinkService],
})
export class StoreSocialLinkModule { }
