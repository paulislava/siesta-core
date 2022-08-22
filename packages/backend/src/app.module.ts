import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { MulterModule } from '@nestjs/platform-express'

import { AppController } from './app.controller'
import { ConfigModule } from './app/config/config.module'
import { DatabaseModule } from './app/database/database.module'
import { AppService } from './app.service'
import { AuthModule } from './app/auth/auth.module'
import { HttpClientsModule } from './common/http-clients/http-clients.module'
import { MailModule } from './app/mail/mail.module'
import { AppAdminModule } from './app/admin/admin.module'
import { UserModule } from './app/users/user.module'
import { PaymentModule } from './app/payments/payment.module'
import { ASSETS_FILE_PATH } from './constants'
import { TelegramModule } from './app/telegram/telegram.module'

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule.forRoot({ global: true }),
    DatabaseModule,
    MulterModule.register({
      dest: ASSETS_FILE_PATH
    }),
    HttpClientsModule,
    MailModule,
    AuthModule,
    AppAdminModule,
    UserModule,
    PaymentModule,
    TelegramModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
