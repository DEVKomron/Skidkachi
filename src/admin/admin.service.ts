import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import * as uuid from "uuid"

@Injectable()
export class AdminService {

  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly jwtService: JwtService
  ) { }

  async getToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      email: admin.email
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

  async create(createAdminDto: CreateAdminDto) {

    if (createAdminDto.password != createAdminDto.confirm_password) {
      throw new BadRequestException("parollar mos emas")
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7)
    const activation_link = uuid.v4()

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
      activation_link
    })

    return newAdmin
  }

  findAll() {
    return this.adminModel.findAll()
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id)
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.update(updateAdminDto, {where:{id}, returning:true})
    return admin[1][0]
  }

  remove(id: number) {
    return this.adminModel.destroy({where:{id}})
  }
  findByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatedAdmin = await this.adminModel.update(
      { hashed_refresh_token },
      {
        where: { id }
      }
    );

    return updatedAdmin
  }
}

