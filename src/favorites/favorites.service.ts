import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './models/favorite.model';
import { retry } from 'rxjs';

@Injectable()
export class FavoritesService {

  constructor(
    @InjectModel(Favorite) private readonly favoriteModel: typeof Favorite
  ) { }

  create(createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteModel.create(createFavoriteDto)
  }

  findAll() {
    return this.favoriteModel.findAll()
  }

  findOne(id: number) {
    return this.favoriteModel.findByPk(id)
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    const favorite = await this.favoriteModel.update(updateFavoriteDto, { where: { id }, returning: true })
    return favorite[1][0]
  }

  remove(id: number) {
    return this.favoriteModel.destroy({where:{id}})
  }
}
