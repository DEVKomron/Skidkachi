import { PartialType } from '@nestjs/swagger';
import { CreateSocialLinkDto } from './create-social_link.dto';

export class UpdateSocialLinkDto extends PartialType(CreateSocialLinkDto) {}
