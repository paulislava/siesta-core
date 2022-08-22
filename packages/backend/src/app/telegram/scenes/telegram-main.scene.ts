import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { Scenes } from 'telegraf'

@Scene('main')
export class TelegramMainScene {
  @SceneEnter()
  async enter(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    await ctx.reply('Я готова! Чем займёмся?')
  }
}
