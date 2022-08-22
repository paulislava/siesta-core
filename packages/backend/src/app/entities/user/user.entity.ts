import { Column, Entity } from 'typeorm'

import { UserCore } from './user-core.entity'

@Entity('users')
export class User extends UserCore {
  @Column('numeric', { name: 'telegram_id', nullable: true })
  telegramId: number | null
}
