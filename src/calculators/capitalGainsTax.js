import { CAPITAL_GAINS_TAX_RATE } from '../constants/taxRates'

export function calculateCapitalGainsTax({ salePrice = 0, acquisitionCost = 0, improvementCost = 0, knownCost = true }) {
  if (!knownCost) {
    // Deemed cost: 80% of sale price when original cost is unknown
    const deemedCost = salePrice * 0.80
    const gain       = salePrice - deemedCost
    const taxAmount  = gain * CAPITAL_GAINS_TAX_RATE
    return {
      salePrice,
      acquisitionCost: deemedCost,
      improvementCost: 0,
      totalCost: deemedCost,
      gain,
      taxAmount,
      effectiveRate: salePrice > 0 ? taxAmount / salePrice : 0,
      deemedCostUsed: true,
    }
  }

  const totalCost = acquisitionCost + improvementCost
  const gain      = Math.max(0, salePrice - totalCost)
  const taxAmount = gain * CAPITAL_GAINS_TAX_RATE
  return {
    salePrice,
    acquisitionCost,
    improvementCost,
    totalCost,
    gain,
    taxAmount,
    effectiveRate: salePrice > 0 ? taxAmount / salePrice : 0,
    deemedCostUsed: false,
  }
}
