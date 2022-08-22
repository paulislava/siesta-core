import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from './user/user.entity'

@Entity('tracking_transactions')
export class TrackingTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ name: 'transaction_id' })
  transactionId: string

  @Column({ name: 'user_id' })
  userId: string

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User

  @Column({ name: 'need_confirmations' })
  needConfirmations: number

  @Column('boolean', { default: false })
  closed: boolean = false
}
