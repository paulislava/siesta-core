import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '../config/config.module'
import { TrackingTransaction } from '../entities/tracking-transaction.entity'
import { User } from '../entities/user/user.entity'
import { TelegramModule } from '../telegram/telegram.module'
import { TelegramService } from '../telegram/telegram.service'

import { BtcHttpClient } from './btc.client'
import { BtcService } from './btc.service'

@Module({
  imports: [ConfigModule, TelegramModule, TypeOrmModule.forFeature([TrackingTransaction, User])],
  providers: [TelegramService, BtcHttpClient, BtcService]
})
export class BtcModule {}
