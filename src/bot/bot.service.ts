import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';
import { Context, Markup, Telegraf } from 'telegraf';

@Injectable()
export class BotService {

    constructor(
        @InjectModel(Bot) private readonly botModel: typeof Bot,
        @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
    ) { }

    async start(ctx: Context) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);
        if (!user) {
            await this.botModel.create({
                user_id,
                user_name: ctx.from?.username,
                first_name: ctx.from?.first_name,
                last_name: ctx.from?.last_name,
                lang: ctx.from?.language_code
            })
            await ctx.reply(`Iltimos, <b>📞 Telefon raqamni yuborish</b> tugmasini bosing`, {
                parse_mode: 'HTML',
                ...Markup.keyboard([
                    [Markup.button.contactRequest("📞 Telefon raqamni yuborish")]
                ])
                    .resize()
                    .oneTime()
            })
        }
        else if (!user.status) {

            await ctx.reply(`Iltimos, <b>📞 Telefon raqamni yuborish</b> tugmasini bosing`, {
                parse_mode: 'HTML',
                ...Markup.keyboard([
                    [Markup.button.contactRequest("📞 Telefon raqamni yuborish")]
                ])
                    .resize()
                    .oneTime()
            })
        } else {
            await this.bot.telegram.sendChatAction(user_id!, "typing")
            await ctx.reply(`Ushbu bot orqali Skidkachi foydalavchilarini faollashtirish uchun yaratilgan`, {
                parse_mode: 'HTML',
                ...Markup.removeKeyboard(),
            })

        }
    }

    async onContact(ctx: Context) {
        if ('contact' in ctx.message!) {

            const user_id = ctx.from?.id;
            const user = await this.botModel.findByPk(user_id);
            if (!user) {
                await ctx.reply(`Iltimos, <b>Start</b> tugmasini bosing`, {
                    parse_mode: 'HTML',
                    ...Markup.keyboard([
                        ["/start"]
                    ])
                        .resize()
                        .oneTime()
                })
            } else if (ctx.message?.contact.user_id != user_id) {
                await ctx.reply(`Iltimos, o'zingizni telefon raqamingizni yuboring`, {
                    parse_mode: 'HTML',
                    ...Markup.keyboard([
                        [Markup.button.contactRequest("📞 Telefon raqamni yuborish")]
                    ])
                        .resize()
                        .oneTime()
                })
            } else {
                await ctx.reply(`Tabriklayman sizning akkauntingiz faollashtirildi.`, {
                    parse_mode: 'HTML',
                    ...Markup.removeKeyboard(),
                })
                user.phone = ctx.message.contact.phone_number
                user.status = true
                await user.save()
            }
        }
    }

}
