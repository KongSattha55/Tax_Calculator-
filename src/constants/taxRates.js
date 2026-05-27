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
export const FRINGE_BENEFIT_TAX_RATE  = 0.20
export const DEDUCTIONS = { spouse: 150_000, child: 150_000 }
export const PREPAYMENT_TAX_RATE = 0.01
export const VAT_RATE = 0.10
export const PROFIT_TAX_RATE = 0.09
export const SENIORITY_EXEMPTION = 4_000_000

export const WITHHOLDING_TAX_RATES = {
  residentServiceRoyaltyInterest: 0.15,
  residentRent: 0.10,
  residentBankFixedDepositInterest: 0.06,
  residentBankSavingsInterest: 0.04,
  selfAssessmentRent: 0.10,
  selfAssessmentInterestRoyalty: 0.15,
  nonResidentCambodiaSource: 0.14,
}

export const INCOME_TAX_RATES = {
  legalEntity: 0.20,
  naturalResources: 0.30,
  qipTaxHoliday: 0.00,
  propertyRiskInsurancePremium: 0.05,
  lifeInsuranceAndOther: 0.20,
}

export const ANNUAL_INCOME_TAX_BRACKETS = [
  { min: 0,           max: 18_000_000,  rate: 0.00, offset: 0 },
  { min: 18_000_000,  max: 24_000_000,  rate: 0.05, offset: 900_000 },
  { min: 24_000_000,  max: 102_000_000, rate: 0.10, offset: 2_100_000 },
  { min: 102_000_000, max: 150_000_000, rate: 0.15, offset: 7_200_000 },
  { min: 150_000_000, max: Infinity,    rate: 0.20, offset: 14_200_000 },
]

export const MINIMUM_TAX_RATE = 0.01

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

// Specific Tax on Certain Merchandise and Services (Excise Tax)
export const SPECIFIC_TAX_GOODS = [
  { key: 'beer',           label: 'ស្រាបៀរ',                          rate: 0.30 },
  { key: 'wine',           label: 'ស្រាទំពាំងបាយជូរ',                  rate: 0.35 },
  { key: 'spirits',        label: 'ស្រាខ្លាំង',                        rate: 0.35 },
  { key: 'tobacco',        label: 'បារី / ថ្នាំជក់',                    rate: 0.20 },
  { key: 'soda',           label: 'ភេសជ្ជៈ / ទឹកអំបោះ',               rate: 0.10 },
  { key: 'vehicle_small',  label: 'យានយន្ត ≤ ១៥០០ ស.ស.',              rate: 0.10 },
  { key: 'vehicle_medium', label: 'យានយន្ត ១៥០១–២០០០ ស.ស.',           rate: 0.20 },
  { key: 'vehicle_large',  label: 'យានយន្ត ២០០១–២៥០០ ស.ស.',           rate: 0.30 },
  { key: 'vehicle_xl',     label: 'យានយន្ត > ២៥០០ ស.ស.',              rate: 0.45 },
  { key: 'telecom',        label: 'សេវាទូរគមនាគមន៍',                   rate: 0.03 },
  { key: 'air_ticket',     label: 'សំបុត្រអាកាសដំណើរអន្តរជាតិ',         rate: 0.10 },
  { key: 'entertainment',  label: 'សេវាកម្មកំសាន្ត',                   rate: 0.10 },
]

// Tax on Immovable Property
export const PROPERTY_TAX_RATE       = 0.001  // 0.1% of assessed value
export const PROPERTY_TAX_EXEMPTION  = 100_000_000  // first 100M KHR of assessed value exempt

// Capital Gains Tax (effective 2024)
export const CAPITAL_GAINS_TAX_RATE  = 0.20
