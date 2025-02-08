import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { SocialLinkModule } from './social_link/social_link.module';
import { DiscountTypeModule } from './discount_type/discount_type.module';
import { District } from './district/models/district.model';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { Admin } from './admin/models/admin.model';
import { DiscountType } from './discount_type/models/discount_type.model';
import { Region } from './region/model/region.model';
import { SocialLink } from './social_link/models/social_link.model';
import { User } from './users/models/user.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName:  BOT_NAME,
      useFactory:()=>({
        token: process.env.BOT_TOKEN||"your_token",
        middlewares:[],
        include:[BotModule]
      })
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      port: Number(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        District,
        DiscountType,
        Region,
        SocialLink,
        User,
        Category
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false
    }),
    UsersModule,
    AuthModule,
    MailModule,
    AdminModule,
    SocialLinkModule,
    DiscountTypeModule,
    DistrictModule,
    RegionModule,
    CategoryModule,
    BotModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
