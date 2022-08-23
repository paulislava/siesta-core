import { Injectable, NotFoundException } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TrackingTransaction } from '../entities/tracking-transaction.entity'
import { TelegramService } from '../telegram/telegram.service'

import { BtcHttpClient } from './btc.client'

@Injectable()
export class BtcService {
  constructor(
    @InjectRepository(TrackingTransaction)
    private readonly trackingTransactionRepository: Repository<TrackingTransaction>,
    private readonly btcHttpClient: BtcHttpClient,
    private readonly telegramService: TelegramService
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkTransactions(): Promise<void> {
    console.info('Check transactions...')

    const transactions = await this.trackingTransactionRepository.find({
      relations: ['user']
    })

    const blocksCount = transactions.length ? await this.btcHttpClient.getBlocksCount() : 0

    await Promise.all(
      transactions.map(async transaction => {
        try {
          const transactionInfo = await this.btcHttpClient.getTransactionInfo(
            transaction.transactionId
          )

          const confirmations = transactionInfo.block_height
            ? blocksCount - transactionInfo.block_height + 1
            : 0

          if (transaction.confirmations != confirmations) {
            if (transaction.user.telegramId) {
              await this.telegramService.sendTransactionInfo(
                transaction.transactionId,
                transaction.user.telegramId,
                confirmations
              )
            }

            if (confirmations >= transaction.needConfirmations) {
              if (transaction.user.telegramId) {
                await this.telegramService.sendTransactionFinalInfo(
                  transaction.transactionId,
                  transaction.user.telegramId
                )
              }

              await transaction.remove()
            } else {
              transaction.confirmations = confirmations
              await transaction.save()
            }
          }
        } catch (e) {
          if (e instanceof NotFoundException) {
            await transaction.remove()
          } else {
            throw e
          }
        }
      })
    )
  }
}
