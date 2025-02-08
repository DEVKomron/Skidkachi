import { Ctx, Start } from "nestjs-telegraf";
import { Context } from "telegraf";

export class BotUpdate {

  @Start()
  async onStart(@Ctx() ctx: Context) {
    ctx.reply("salom")
  }

}