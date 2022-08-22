import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf'
import { Scenes, Telegraf } from 'telegraf'

import { TelegramCommand } from './telegram.types'

@Update()
export class TelegramUpdate {
  @Start()
  async start(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    await ctx.scene.enter('main')
  }

  @Command(TelegramCommand.TRACK_TRANSACTION)
  async trackTransactionStart(ctx: Scenes.SceneContext): Promise<void> {
    await ctx.scene.enter('transaction-track')
  }
}
