import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'

import { User } from './user/user.entity'

@Entity('tracking_transactions')
export class TrackingTransaction extends BaseEntity {
  @PrimaryColumn({ name: 'transaction_id' })
  transactionId: string

  @PrimaryColumn({ name: 'user_id' })
  userId: number

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User

  @Column({ name: 'confirmations', default: 0 })
  confirmations: number

  @Column({ name: 'need_confirmations' })
  needConfirmations: number

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date
}
