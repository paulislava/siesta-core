export interface UserBalance {
  pure: number
  bonus: number
  full: number
}

export interface UserTransaction {
  date: string
  title: string | null
  summ: number
  bonusSumm: number
  id: string
}
