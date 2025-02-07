import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category) private readonly userModel: typeof Category
  ) { }

  create(createCategoryDto: CreateCategoryDto) {
    return this.userModel.create(createCategoryDto);
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findOne({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.userModel.update(updateCategoryDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
