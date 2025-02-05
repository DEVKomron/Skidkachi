import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import * as bcrypt from 'bcrypt'
import { SignInUserDto } from '../users/dto/sign_in-user.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private readonly userService: UsersService
    ) { }

    async signIn(signInUserDto: SignInUserDto) {

        if (!signInUserDto.email || !signInUserDto.password) {
            throw new BadRequestException()
        }

        const user = await this.userModel.findOne({ where: { email: signInUserDto.email } })
        if (!user) {
            throw new UnauthorizedException('Invalid Email or password')
        }
        const validPassword = await bcrypt.compare(signInUserDto.password, user.hashed_password)
        if (!validPassword) {
            throw new UnauthorizedException('Invalid Email or password')
        }
        const tokens = await this.userService.getTokens(user)
        user.hashed_refresh_token = tokens.refresh_token

        await user.save()

        return { message: "welcome", accessToken: tokens.access_token }
    }

}
