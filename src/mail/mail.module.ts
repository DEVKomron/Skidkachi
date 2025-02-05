import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          secure: false,
          auth: {
            user: config.get<string>('SMTP_USER'),
            pass: config.get<string>('SMTP_PASSWORD')
          },
        },
        defaults: {
          from: `"Skidkachi"~${config.get<string>('SMTP_USER')}`
        },
        template: {
          dir: join(__dirname, "templates"),
          // adapter:new HandlebarsAdapter(),
          template: 'confirmation',
          options: {
            strict: true
          }
        }
      }),
      inject:[ConfigService]
    })
  ],
  providers: [MailService]
})
export class MailModule { }
