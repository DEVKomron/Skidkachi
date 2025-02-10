import { Action, Command, Ctx, Hears, On, Start, Update } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {

  constructor(
    private readonly botService : BotService
  ){}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx)
  }

    @On("contact")
  async onContact(@Ctx() ctx: Context) {
    if ('contact' in ctx.message!) {
      await this.botService.onContact(ctx)
    }
  }


  // @Hears("hi")
  // async onHier(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("salom")

  // }

  // @Command('help')
  // async onHelpCommand(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("hozr iloji yo'q")
  // }
  // @Command('about')
  // async onAboutCommand(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("botti uyoq-buyoqlarini qarasangiz ma'lumotlar yozilgan")
  // }

  // @Command('inline')
  // async onInlineCommand(@Ctx() ctx: Context) {
  //   const inlineKeybord = [
  //     [
  //       {
  //         text: "Tugma1",
  //         callback_data: "button_1"
  //       },
  //       {
  //         text: "Tugma2",
  //         callback_data: "button_2"
  //       },
  //       {
  //         text: "Tugma3",
  //         callback_data: "button_3"
  //       },
  //     ],
  //     [
  //       {
  //         text: "Tugma4",
  //         callback_data: "button_4"
  //       },
  //       {
  //         text: "Tugma5",
  //         callback_data: "button_5"
  //       },
  //     ],
  //     [
  //       {
  //         text: "Tugma6",
  //         callback_data: "button_6"
  //       },
  //     ],
  //   ]
  //   await ctx.reply("Inline Keybord: Kerakli tugmani bosing", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeybord
  //     }
  //   })
  // }

  // @Action('button_1')
  // async onButton1Action(@Ctx() ctx: Context) {
  //   await ctx.reply("1-tugma bosildi")
  // }
  // @Action(/^button_+[1-9]/)
  // async onButtonActionAny(@Ctx() ctx: Context) {
  //   const actionText = ctx.callbackQuery!["data"];
  //   const buttonId = actionText.split("_")[1]
  //   console.log(actionText);

  //   await ctx.reply(`${buttonId}-tugma bosildi`)
  // }

  // @Command('main')
  // async onMainButton(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("kerakli main tugmani bos", {
  //     ...Markup.keyboard([
  //       [Markup.button.contactRequest(`📞 telefon raqamingizni yuboring`)],
  //       [Markup.button.locationRequest(`📍 turgan manzilingizni yuboring`)],
  //       ["tugma1",],
  //       ["tugma2", "tugma3"],
  //       ["tugma4", "tugma5", "tugma6"]
  //     ])
  //   })
  // }

  // @Hears(/^tugma+\d+$/)
  // async onButtonHear(@Ctx() ctx: Context) {

  //   if('text' in ctx.message!){
  //     const buttonId = ctx.message.text.split("tugma")
  //     await ctx.replyWithHTML(`${buttonId[1]}-button bosildi`)
  //   }
  // }


  // @On("text")
  // async onText(@Ctx() ctx: Context) {
  //   console.log(ctx.from);
  //   console.log(ctx.chat);

  //   if ("text" in ctx.message!) {
  //     if (ctx.message.text === "salom") {
  //       await ctx.replyWithHTML("<b>Vaaleykum assalom</b>")
  //     }
  //     else {
  //       await ctx.reply(ctx.message.text)
  //     }
  //   }
  // }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ('photo' in ctx.message!) {
  //     console.log(ctx.message!.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     )
  //   }

  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ('video' in ctx.message!) {
  //     console.log(ctx.message!.video);
  //     await ctx.replyWithHTML(
  //       String(ctx.message.video.duration)
  //     )
  //   }
  // }

  // @On("sticker")
  // async onSticer(@Ctx() ctx: Context) {
  //   if ('sticker' in ctx.message!) {
  //     console.log(ctx.message!.sticker);
  //     await ctx.replyWithHTML(
  //       String(ctx.message.sticker.emoji)
  //     )
  //   }
  // }


  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   if ('location' in ctx.message!) {
  //     console.log(ctx.message!.location);
  //     await ctx.replyWithHTML(String(ctx.message.location.latitude))
  //     await ctx.replyWithHTML(String(ctx.message.location.longitude))
  //     await ctx.replyWithHTML(String(ctx.message.location.horizontal_accuracy))
  //   }
  // }
  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ('voice' in ctx.message!) {
  //     console.log(ctx.message!.voice);
  //     await ctx.replyWithHTML(String(ctx.message.voice.duration))
  //     await ctx.replyWithAudio(String(ctx.message.voice.file_id))
  //   }
  // }

  // @On("invoice")
  // async onInVoice(@Ctx() ctx: Context) {
  //   if ('invoice' in ctx.message!) {
  //     console.log(ctx.message!.invoice);
  //     await ctx.replyWithHTML(String(ctx.message.invoice.currency))
  //   }
  // }
  // @On("document")
  // async onDocument(@Ctx() ctx: Context) {
  //   if ('document' in ctx.message!) {
  //     console.log(ctx.message!.document);
  //     await ctx.replyWithHTML(String(ctx.message.document))
  //   }
  // }



  // @On("message")
  // async onMessage(@Ctx() ctx: Context) {
  //   console.log(ctx.botInfo);
  //   console.log(ctx.chat);
  //   console.log(ctx.from);
  //   console.log(ctx.from?.first_name);

  // }
}