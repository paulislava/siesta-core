import { Command, Ctx, Hears, Start, Update } from 'nestjs-telegraf'
import { Context, Scenes } from 'telegraf'

@Update()
export class TelegramUpdate {
  @Start()
  async start(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('Welcome')
    await this.setCommands(ctx)
  }

  @Command('track_transaction')
  async trackTransactionStart(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    await ctx.scene.enter('transaction-track')
  }

  @Hears('hi')
  async hears(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('Hey there')
  }

  private async setCommands(@Ctx() ctx: Context): Promise<void> {
    await ctx.telegram.setMyCommands([
      {
        command: 'track_transaction',
        description: 'Отслеживание транзакции BTC'
      }
    ])
  }
}
