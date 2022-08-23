import { Injectable } from '@nestjs/common'

import { ConfigService } from '../config/config.service'

import { TransactionInfo } from './btc.types'

import { BaseHttpClient } from '~/common/http-clients/base-http-client'

@Injectable()
export class BtcHttpClient extends BaseHttpClient {
  protected host: string

  constructor(private readonly configService: ConfigService) {
    super()
    this.host = this.configService.btc.host
  }

  getBlocksCount(): Promise<number> {
    return this.get<number>(this.configService.btc.countPath)
  }

  getTransactionInfo(transactionId: string): Promise<TransactionInfo> {
    const path = `${this.configService.btc.transactionPath}${transactionId}`
    return this.get<TransactionInfo>(path)
  }
}
