import { PartialType } from '@nestjs/swagger';
import { CreateStoreSocialLinkDto } from './create-store-social_link.dto';

export class UpdateStoreSocialLinkDto extends PartialType(CreateStoreSocialLinkDto) {}
