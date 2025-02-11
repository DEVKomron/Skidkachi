import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from './models/favorite.model';

@Module({
  imports:[SequelizeModule.forFeature([Favorite])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
