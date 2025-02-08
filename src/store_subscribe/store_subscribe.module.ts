import { Module } from '@nestjs/common';
import { StoreSubscribeService } from './store_subscribe.service';
import { StoreSubscribeController } from './store_subscribe.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreSubscribe } from './models/store_subscribe.model';

@Module({
  imports:[SequelizeModule.forFeature([StoreSubscribe])],
  controllers: [StoreSubscribeController],
  providers: [StoreSubscribeService],
})
export class StoreSubscribeModule {}
