import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.model';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectModel(Review) private readonly reviewModel: typeof Review
  ) { }

  create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create(createReviewDto)
  }

  findAll() {
    return this.reviewModel.findAll()
  }

  findOne(id: number) {
    return this.reviewModel.findByPk(id)
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewModel.update(updateReviewDto, { where: { id }, returning: true })
    return review[1][0]
  }

  remove(id: number) {
    return this.reviewModel.destroy({ where: { id } })
  }
}
