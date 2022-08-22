import { Entity } from 'typeorm'

import { UserCore } from './user-core.entity'

@Entity('users')
export class User extends UserCore {}
