import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import * as uuid from "uuid"


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService
  ) { }

  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
      email: user.email,
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ])

    return{
      access_token: accessToken,
      refresh_token:refreshToken
    }
  }

  async create(createUserDto: CreateUserDto) {
    
    if(createUserDto.password !== createUserDto.confirm_password){
      throw new BadRequestException("parollar mos emas")
    }
    const hashed_password = await bcrypt.hash(createUserDto.password,7)

    const activation_link = uuid.v4()

    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
      activation_link
    })

    return newUser
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
