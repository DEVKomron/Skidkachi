import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) { }

    async sendMail(user: User) {
        const url = `${process.env.API_URL}/users/activate/${user.activation_link}`;
        console.log(url);
        await this.mailerService.sendMail({
            to: user.email,
            subject: `Skidkachi ga hush kelibsiz`,
            template: "./confirm",
            context: {
                name: user.name,
                url
            },
        });
        console.log(url);
    }
}
