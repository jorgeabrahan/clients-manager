export const HNLFormatter = new Intl.NumberFormat('en-HN', {
  style: 'currency',
  currency: 'HNL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})
export const toLocalCurrency = (number) => {
  return HNLFormatter.format(number)
}
