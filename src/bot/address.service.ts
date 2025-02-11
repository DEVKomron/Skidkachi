import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Address } from "./models/address.model";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onAddress(ctx: Context) {
    try {
      await ctx.reply(`Foydalanuvchi manzillari`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          ["Mening manzillarim", "Yangi manzil qo'shish"],
        ]).resize(),
      });
    } catch (error) {
      console.log("onStopError: ", error);
    }
  }

  async onCommandNewAddress(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user || !user.status) {
        await ctx.reply(`Siz avval ro'yxatdan o'ting`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        await this.addressModel.create({ user_id, last_state: "name" });

        await ctx.reply(
          `Yangi manzilingiz nomini kiriting (masalan: <i>Uyim</i>): `,
          {
            parse_mode: "HTML",
            ...Markup.removeKeyboard(),
          }
        );
      }
    } catch (error) {
      console.log("OnCommanNewAddressError: ", error);
    }
  }

  async onCommandMyAddresses(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user || !user.status) {
        await ctx.reply(`Siz avval ro'yxatdan o'ting`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        const addresses = await this.addressModel.findAll({
          where: { user_id, last_state: "finish" },
        });
        addresses.forEach(async (address) => {
          await ctx.replyWithHTML(
            `<b>Manzil nomi: </b> <i>${address.name} </i>\n<b>Manzil:</b> <i>${address.address}</i>`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Locatsiyani ko'rish",
                      callback_data: `loc_${address.id}`,
                    },
                    {
                      text: "Manzilni o'chirish",
                      callback_data: `del_${address.id}`,
                    },
                  ],
                ],
              },
            }
          );
        });
      }
    } catch (error) {
      console.log("onCommandMyAddresses: ", error);
    }
  }
  async onClickLocation(ctx: Context) {
    try {
      const contextAction = ctx.callbackQuery!["data"];
      const address_id = contextAction.split("_")[1];
      const address = await this.addressModel.findByPk(address_id);

      if (address) {
        await ctx.replyWithLocation(
          Number(address?.location?.split(".")[0]),
          Number(address?.location?.split(".")[1])
        );
      }
    } catch (error) {
      console.log("onCommandMyAddresses: ", error);
    }
  }
  async onDeleteLocation(ctx: Context) {
    try {
      const contextAction = ctx.callbackQuery!["data"];
      const address_id = contextAction.split("_")[1];
      await this.addressModel.destroy({ where: { id: address_id } });

      await ctx.reply(`Manzil muvavvaqqiyatli o'chirildi o'chirildi`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          ["Mening manzillarim", "Yangi manzil qo'shish"],
        ]).resize(),
      });
    } catch (error) {
      console.log("onCommandMyAddresses: ", error);
    }
  }
}
