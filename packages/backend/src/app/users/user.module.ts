import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '../config/config.module'
import { User } from '../entities/user/user.entity'

import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
