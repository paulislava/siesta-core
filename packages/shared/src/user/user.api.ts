import { APIRoutes } from '../api-routes'

export interface UserApi {}

export const USER_CONTROLLER_PATH: string = '/user'

export const USER_ROUTES: APIRoutes<UserApi> = {}

export const userFullRoute = (route: string): string => `${USER_CONTROLLER_PATH}${route}`
