import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SignInUserDto } from '../users/dto/sign_in-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  signIn(@Body() signInUserDto: SignInUserDto) {
    console.log(signInUserDto);
    return this.authService.signIn(signInUserDto)
  }
}

