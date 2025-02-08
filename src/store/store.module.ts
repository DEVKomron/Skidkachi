import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Store } from './models/store.model';
import { StoreSocialLink } from '../store-social_link/models/store-social_link.model';

@Module({
  imports:[SequelizeModule.forFeature([Store, StoreSocialLink])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
