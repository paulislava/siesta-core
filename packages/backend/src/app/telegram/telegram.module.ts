import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

import { TelegramService } from './telegram.service'
import { TelegramUpdate } from './telegram.update'

@Module({
  imports: [
    ConfigModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({ token: configService.telegram.token })
    })
  ],
  providers: [TelegramService, TelegramUpdate]
})
export class TelegramModule {}
