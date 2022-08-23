export const pluralForm = (value: number, one: string, two: string, five: string): string => {
  const valueDigit = value % 10
  return valueDigit == 1 ? one : valueDigit > 1 && valueDigit < 5 ? two : five
}
