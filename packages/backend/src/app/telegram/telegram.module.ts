import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { session, Telegraf } from 'telegraf'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

import { TelegramTransactionTrackScene } from './scenes/telegram-transaction-track.scene'
import { TelegramService } from './telegram.service'
import { TelegramUpdate } from './telegram.update'

@Module({
  imports: [
    ConfigModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.telegram.token,
        middlewares: [session()]
      })
    })
  ],
  providers: [Telegraf, TelegramTransactionTrackScene, TelegramService, TelegramUpdate]
})
export class TelegramModule {}
