import { APIRoutes } from '../api-routes'

import { UserBalance, UserTransaction } from './user.types'

export interface UserApi {
  balance(...args: any): Promise<UserBalance>
  transactions(...args: any): Promise<UserTransaction[]>
}

export const USER_CONTROLLER_PATH: string = '/user'

export const USER_ROUTES: APIRoutes<UserApi> = {
  balance: () => '/balance',
  transactions: () => '/transactions'
}

export const userFullRoute = (route: string): string => `${USER_CONTROLLER_PATH}${route}`
