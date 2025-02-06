import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import * as uuid from "uuid"
import { MailService } from '../mail/mail.service';
import { link } from 'fs';
import { where } from 'sequelize';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
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

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }

  async create(createUserDto: CreateUserDto) {

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("parollar mos emas")
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7)

    const activation_link = uuid.v4()

    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
      activation_link
    })

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Xat yuborishda xatolik")
    }

    return newUser
  }

  async activate(link: string) {
    console.log("hello2");

    if (!link) {
      throw new BadRequestException("Activation link not found")
    }
    const updateUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false
        },
        returning: true
      },
    )

    if (!updateUser[1][0]) {
      throw new BadRequestException("User already activates")
    }
    const response = {
      message: "User activated successfully",
      user: updateUser[1][0].is_active
    }

    return response
  }
  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
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
  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatedUser = await this.userModel.update(
      { hashed_refresh_token },
      {
        where: { id }
      }
    );

    return updatedUser
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
