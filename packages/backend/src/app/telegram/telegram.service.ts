import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InjectBot } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'
import { Chat } from 'telegraf/typings/core/types/typegram'
import { Repository } from 'typeorm'

import { User } from '../entities/user/user.entity'
import { BtcService } from '../btc/btc.service'
import { TrackingTransaction } from '../entities/tracking-transaction.entity'

import { pluralForm } from '~/common/utils/helpers'

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @InjectRepository(TrackingTransaction)
    private readonly trackingTransactionRepository: Repository<TrackingTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getOrCreateUser({
    id: telegramId,
    first_name: firstName,
    last_name: lastName
  }: Chat.PrivateChat): Promise<User> {
    const user = await this.userRepository.findOneBy({ telegramId })
    if (user) {
      return user
    }

    return this.userRepository.save(this.userRepository.create({ telegramId, firstName, lastName }))
  }

  async trackTransaction(
    transactionId: string,
    needConfirmations: number,
    chat: Chat.PrivateChat
  ): Promise<void> {
    const user = await this.getOrCreateUser(chat)
    const trackingTransaction = this.trackingTransactionRepository.create({
      user,
      transactionId,
      needConfirmations
    })
    await trackingTransaction.save()
  }

  async sendTransactionInfo(
    transactionId: string,
    userId: number,
    confirmations: number
  ): Promise<void> {
    await this.bot.telegram.sendMessage(
      userId,
      `Транзакция ${transactionId}: <b>${confirmations}</b> ${pluralForm(
        confirmations,
        'подтверждение',
        'подтверждения',
        'подтверждений'
      )}`,
      {
        parse_mode: 'HTML'
      }
    )
  }

  async sendTransactionFinalInfo(transactionId: string, userId: number): Promise<void> {
    await this.bot.telegram.sendMessage(
      userId,
      `Отслеживание транзакции <b>${transactionId}</b> завершено`,
      {
        parse_mode: 'HTML'
      }
    )
  }
}
