import { SPECIFIC_TAX_GOODS } from '../constants/taxRates'

export { SPECIFIC_TAX_GOODS }

export function calculateSpecificTax(amount = 0, goodsKey = 'beer') {
  const item = SPECIFIC_TAX_GOODS.find(g => g.key === goodsKey) ?? SPECIFIC_TAX_GOODS[0]
  const taxAmount = amount * item.rate
  return {
    key: item.key,
    label: item.label,
    rate: item.rate,
    taxableValue: amount,
    taxAmount,
    totalInclTax: amount + taxAmount,
  }
}
