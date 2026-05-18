import { PREPAYMENT_TAX_RATE, VAT_RATE } from '../constants/taxRates'

// Per Tax_03 p.10:
//   Base = turnover excluding VAT.
//   If turnover is reported INCLUDING VAT, strip it via /(1 + VAT_RATE).
//   Tax = base * 1%.
export function calculatePrepaymentTax(turnover = 0, { vatInclusive = true } = {}) {
  const base       = vatInclusive ? turnover / (1 + VAT_RATE) : turnover
  const taxAmount  = base * PREPAYMENT_TAX_RATE
  return { base, taxAmount, annualEstimate: taxAmount * 12 }
}
