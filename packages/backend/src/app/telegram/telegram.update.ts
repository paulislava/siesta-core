import { Command, Ctx, Hears, Start, Update } from 'nestjs-telegraf'
import { Context } from 'telegraf'

@Update()
export class TelegramUpdate {
  @Start()
  async start(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('Welcome')
  }

  @Command('/track-transaction')
  async trackTransaction(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('Введи номер транзакции BTC')
  }

  @Hears('hi')
  async hears(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('Hey there')
  }
}
