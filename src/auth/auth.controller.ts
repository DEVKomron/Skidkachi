import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from '../users/dto/sign_in-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @ApiOperation({summary:"Yangi foydalanuvchilarni ro'yxatdan o'tkazish"})
  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }
  
  @ApiOperation({summary:"Admin ro'yxatdan o'tkazish"})
  @Post('/admin/sign-up')
  adminSignUp(@Body() createAdminDto: CreateUserDto) {
    return this.authService.adminSignUp(createAdminDto)
  }

  @ApiOperation({summary:"Tizimga kirish"})
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(
    @Body() signInUserDto: SignInDto,
    @Res({passthrough:true}) res : Response
  ) {
    return this.authService.signIn(signInUserDto, res)
  }

  @ApiOperation({summary:"Admin tizimga kirish"})
  @HttpCode(HttpStatus.OK)
  @Post('admin/sign-in')
  adminSignIn(
    @Body() signInUserDto: SignInDto,
    @Res({passthrough:true}) res : Response
  ) {
    return this.authService.signIn(signInUserDto, res)
  }

}

