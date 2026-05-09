import { SALARY_TAX_BRACKETS, NON_RESIDENT_SALARY_RATE, DEDUCTIONS } from '../constants/taxRates'

export function calculateResidentSalaryTax({ grossSalary = 0, hasSpouse = false, numChildren = 0, nonTaxableBenefits = 0 }) {
  const taxableBase = Math.max(0,
    grossSalary - nonTaxableBenefits
    - (hasSpouse ? DEDUCTIONS.spouse : 0)
    - numChildren * DEDUCTIONS.child
  )
  const bracket = SALARY_TAX_BRACKETS.findLast(b => taxableBase >= b.min)
  const taxAmount = Math.max(0, taxableBase * bracket.rate - bracket.offset)
  return { taxableBase, taxAmount, effectiveRate: grossSalary > 0 ? taxAmount / grossSalary : 0, bracketUsed: bracket }
}

export function calculateNonResidentSalaryTax(grossSalary = 0) {
  return { taxableBase: grossSalary, taxAmount: grossSalary * NON_RESIDENT_SALARY_RATE, effectiveRate: NON_RESIDENT_SALARY_RATE }
}
