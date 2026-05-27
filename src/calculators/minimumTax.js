import { MINIMUM_TAX_RATE } from '../constants/taxRates'

export function calculateMinimumTax({
  annualTurnover = 0,
  incomeTaxLiability = 0,
  vatInclusive = false,
} = {}) {
  const turnoverExclVAT = vatInclusive ? annualTurnover / 1.10 : annualTurnover
  const minimumTax = turnoverExclVAT * MINIMUM_TAX_RATE
  const finalLiability = Math.max(incomeTaxLiability, minimumTax)

  return {
    turnoverExclVAT,
    minimumTax,
    incomeTaxLiability,
    finalLiability,
    additionalDueFromMinimumTax: Math.max(0, minimumTax - incomeTaxLiability),
    rate: MINIMUM_TAX_RATE,
    minimumTaxApplies: minimumTax > incomeTaxLiability,
  }
}
