import { PROPERTY_TAX_RATE, PROPERTY_TAX_EXEMPTION } from '../constants/taxRates'

export function calculatePropertyTax(marketValue = 0) {
  const assessedValue   = marketValue * 0.80
  const taxableBase     = Math.max(0, assessedValue - PROPERTY_TAX_EXEMPTION)
  const taxAmount       = taxableBase * PROPERTY_TAX_RATE
  return {
    marketValue,
    assessedValue,
    exemptionApplied: Math.min(assessedValue, PROPERTY_TAX_EXEMPTION),
    taxableBase,
    taxAmount,
  }
}
