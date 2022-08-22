import { Controller, UseGuards } from '@nestjs/common'
import { UserApi, USER_CONTROLLER_PATH } from '@template/shared/user/user.api'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller(USER_CONTROLLER_PATH)
@UseGuards(JwtAuthGuard)
export class UserController implements UserApi {}
