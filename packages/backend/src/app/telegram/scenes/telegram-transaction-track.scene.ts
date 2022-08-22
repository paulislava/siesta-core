import { Ctx, Message, Wizard, WizardStep } from 'nestjs-telegraf'
import { Scenes } from 'telegraf'
import { Message as TelegramMessage } from 'telegraf/typings/core/types/typegram'

@Wizard('transaction-track')
export class TelegramTransactionTrackScene {
  @WizardStep(1)
  async enter(@Ctx() ctx: Scenes.WizardContext): Promise<void> {
    await ctx.reply('Введи номер транзакции BTC')
    ctx.wizard.next()
  }

  @WizardStep(2)
  async startTrack(
    @Ctx() ctx: Scenes.WizardContext,
    @Message() msg: TelegramMessage.TextMessage
  ): Promise<void> {
    const transactionCode = msg.text.trim()
    if (!transactionCode) {
      await ctx.reply('Введи корректный номер транзакции')
      throw Error()
    }
    await ctx.reply(`Отслеживание транзакции ${transactionCode} запущено`)
  }
}
