import { FRINGE_BENEFIT_TAX_RATE } from '../constants/taxRates'

// Per Tax_02 p.9 (Prakas 1173 + Sarachor 011): employer withholds 20% monthly
// on the market value of fringe benefits provided to employees — vehicles,
// meals, housing, utilities, domestic staff, below-market loans, discounted
// goods, education subsidies, life/health insurance not provided uniformly,
// excess pension contributions (>10% of monthly salary + benefits), etc.
//
// The market value is the all-tax-included price.
export function calculateFringeBenefitTax(marketValue = 0) {
  const taxAmount = marketValue * FRINGE_BENEFIT_TAX_RATE
  return { marketValue, taxAmount, rate: FRINGE_BENEFIT_TAX_RATE }
}

export function sumFringeBenefits(items = []) {
  return items.reduce((sum, item) => sum + (Number(item) || 0), 0)
}
