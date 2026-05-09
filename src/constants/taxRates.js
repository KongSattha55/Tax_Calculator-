// Cambodian Tax Rates & Constants
// Source: Tax_01, Tax_02, Tax_03 documents

export const SALARY_TAX_BRACKETS = [
  { min: 0,          max: 1_500_000,  rate: 0.00, offset: 0 },
  { min: 1_500_000,  max: 2_000_000,  rate: 0.05, offset: 75_000 },
  { min: 2_000_000,  max: 8_500_000,  rate: 0.10, offset: 175_000 },
  { min: 8_500_000,  max: 12_500_000, rate: 0.15, offset: 600_000 },
  { min: 12_500_000, max: Infinity,   rate: 0.20, offset: 1_225_000 },
]

export const NON_RESIDENT_SALARY_RATE = 0.20
export const DEDUCTIONS = { spouse: 150_000, child: 150_000 }
export const PREPAYMENT_TAX_RATE = 0.01
export const VAT_RATE = 0.10
export const PROFIT_TAX_RATE = 0.09
export const SENIORITY_EXEMPTION = 4_000_000

export const PENALTIES = {
  obstruction:          2_000_000,
  underDeclarationLow:  0.10,
  underDeclarationHigh: 0.25,
  assessmentByGDT:      0.40,
  monthlyInterest:      0.015,
}

export const TAXPAYER_THRESHOLDS = {
  small:  { min: 250_000_000,   max: 700_000_000 },
  medium: { min: 700_000_000,   max: 4_000_000_000 },
  large:  { min: 4_000_000_001, max: Infinity },
}
