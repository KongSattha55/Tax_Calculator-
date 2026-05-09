import { PREPAYMENT_TAX_RATE } from '../constants/taxRates'

export function calculatePrepaymentTax(monthlyTurnoverWithVAT = 0) {
  const base = monthlyTurnoverWithVAT / 1.1
  const taxAmount = base * PREPAYMENT_TAX_RATE
  return { base, taxAmount, annualEstimate: taxAmount * 12 }
}
