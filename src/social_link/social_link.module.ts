import { Module } from '@nestjs/common';
import { SocialLinkService } from './social_link.service';
import { SocialLinkController } from './social_link.controller';

@Module({
  controllers: [SocialLinkController],
  providers: [SocialLinkService],
})
export class SocialLinkModule {}
