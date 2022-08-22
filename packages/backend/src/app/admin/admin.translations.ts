import { LocaleTranslations, LocaleTranslationsBlock } from 'adminjs'

import { UserDraft } from '../entities/user/user-draft.entity'
import { User } from '../entities/user/user.entity'

import { ResourceTranslations, entityTranslations } from './admin.translations.types'

const properties: Record<string, string> = {
  firstName: 'Имя',
  lastName: 'Фамилия',
  email: 'E-mail',
  tel: 'Телефон',
  createdAt: 'Дата создания',
  userId: 'Пользователь',
  from: 'От',
  to: 'До',
  id: 'ID'
}

const labels: Record<string, string> = {}

const userTranslations: ResourceTranslations<User> = {
  name: 'Пользователи',
  properties: {}
}

const userDraftTranslations: ResourceTranslations<UserDraft> = {
  name: 'Приглашения пользователей',
  properties: {}
}

const resources: { [key: string]: Partial<LocaleTranslationsBlock> } = {
  ...entityTranslations(User, userTranslations),
  ...entityTranslations(UserDraft, userDraftTranslations)
}

export const adminTranslations: LocaleTranslations = {
  resources,
  properties,
  labels
}
