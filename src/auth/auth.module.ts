import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';

@Module({
  imports:[JwtModule.register({global:true}), 
    SequelizeModule.forFeature([User]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
