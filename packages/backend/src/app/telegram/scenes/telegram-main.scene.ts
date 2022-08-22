import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { Scenes } from 'telegraf'

import { TelegramCommand } from '../telegram.types'

@Scene('main')
export class TelegramMainScene {
  @SceneEnter()
  async enter(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    await ctx.telegram.setMyCommands([
      {
        command: TelegramCommand.TRACK_TRANSACTION,
        description: 'Отслеживание транзакции BTC'
      }
    ])
    await ctx.reply('Я готова! Чем займёмся?')
  }
}
