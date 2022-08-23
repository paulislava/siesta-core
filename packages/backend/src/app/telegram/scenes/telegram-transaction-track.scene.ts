import { HttpStatus } from '@nestjs/common'
import { Ctx, Hears, Message, Scene, SceneEnter } from 'nestjs-telegraf'
import fetch from 'node-fetch'
import { Scenes } from 'telegraf'
import { Chat, Message as TelegramMessage } from 'telegraf/typings/core/types/typegram'

import { TelegramService } from '../telegram.service'
import { NOT_COMMAND_REGEX } from '../telegram.types'

import { BtcHttpClient } from '~/app/btc/btc.client'

interface SessionData extends Scenes.SceneSessionData {
  transactionId?: string
}

type Context = Scenes.SceneContext<SessionData>

@Scene('transaction-track')
export class TelegramTransactionTrackScene {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly btcHttpClient: BtcHttpClient
  ) {}

  @SceneEnter()
  async enter(@Ctx() ctx: Context): Promise<void> {
    ctx.scene.session.transactionId = undefined
    await ctx.reply('Введи номер транзакции BTC')
  }

  @Hears(NOT_COMMAND_REGEX)
  async enterId(@Ctx() ctx: Context, @Message() msg: TelegramMessage.TextMessage): Promise<void> {
    if (!ctx.scene.session.transactionId) {
      const transactionId = msg.text?.trim()
      if (!transactionId) {
        await ctx.reply('Введи корректный номер транзакции')
        return
      }

      try {
        await this.btcHttpClient.getTransactionInfo(transactionId)
      } catch (e) {
        await ctx.reply('Транзакция не найдена')
        return
      }

      ctx.scene.session.transactionId = transactionId
      await ctx.reply('Введи необходимое количество подтверждений')
    } else {
      const needConfirmations = Number(msg.text)
      if (!needConfirmations) {
        await ctx.reply('Введи корректное количество подтверждений')
        return
      }

      const transactionId = ctx.scene.session.transactionId

      await this.telegramService.trackTransaction(
        transactionId,
        needConfirmations,
        msg.chat as Chat.PrivateChat
      )
      await ctx.reply(`Отслеживание транзакции <b>${transactionId}</b> запущено`, {
        parse_mode: 'HTML'
      })

      ctx.scene.reset()
      await ctx.scene.leave()
      await ctx.scene.enter('main')
    }
  }
}

// @Wizard('transaction-track')
// export class TelegramTransactionTrackScene extends TelegramCommandScene {
//   constructor(private readonly telegramService: TelegramService) {
//     super()
//   }

//   @WizardStep(1)
//   async enter(@Ctx() ctx: Context): Promise<void> {
//     await ctx.reply('Введи номер транзакции BTC')

//     ctx.wizard.next()
//   }

//   @WizardStep(2)
//   async enterId(@Ctx() ctx: Context, @Message() msg: TelegramMessage.TextMessage): Promise<void> {
//     const transactionId = msg.text?.trim()
//     if (!transactionId) {
//       await ctx.reply('Введи корректный номер транзакции')
//       return
//     }

//     const fetchTransaction = await fetch(`https://blockchain.info/rawtx/${transactionId}`)
//     if (fetchTransaction.status !== HttpStatus.OK) {
//       await ctx.reply('Транзакция не найдена')
//       return
//     }

//     ctx.scene.session.transactionId = transactionId
//     await ctx.reply('Введи необходимое количество подтверждений')
//     ctx.wizard.next()
//   }

//   @WizardStep(3)
//   async startTrack(
//     @Ctx() ctx: Context,
//     @Message() msg: TelegramMessage.TextMessage
//   ): Promise<void> {
//     const needConfirmations = Number(msg.text)
//     if (!needConfirmations) {
//       await ctx.reply('Введи корректное количество подтверждений')
//       return
//     }

//     const transactionId = ctx.scene.session.transactionId

//     await this.telegramService.trackTransaction(
//       transactionId,
//       needConfirmations,
//       msg.chat as Chat.PrivateChat
//     )
//     await ctx.reply(`Отслеживание транзакции <b>${transactionId}</b> запущено`, {
//       parse_mode: 'HTML'
//     })
//     await ctx.scene.leave()
//     await ctx.scene.enter('main')
//   }
// }
