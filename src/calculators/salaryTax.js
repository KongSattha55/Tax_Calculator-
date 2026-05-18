import {
  SALARY_TAX_BRACKETS,
  NON_RESIDENT_SALARY_RATE,
  DEDUCTIONS,
  SENIORITY_EXEMPTION,
} from '../constants/taxRates'

// Per Tax_02 p.21 (Sarachor 002 SHV.APD): from 2020, seniority pay is exempt
// from salary tax up to 4,000,000 KHR per year.
export function exemptSeniorityPay(seniorityPayThisMonth = 0, seniorityPaidYTD = 0) {
  const remainingAnnualCap = Math.max(0, SENIORITY_EXEMPTION - seniorityPaidYTD)
  const exempt    = Math.min(seniorityPayThisMonth, remainingAnnualCap)
  const taxable   = seniorityPayThisMonth - exempt
  return { exempt, taxable }
}

export function calculateResidentSalaryTax({
  grossSalary = 0,
  hasSpouse = false,
  numChildren = 0,
  nonTaxableBenefits = 0,
  seniorityPay = 0,
  seniorityPaidYTD = 0,
}) {
  const { exempt: seniorityExempt, taxable: seniorityTaxable } =
    exemptSeniorityPay(seniorityPay, seniorityPaidYTD)

  const taxableBase = Math.max(0,
    grossSalary
    - nonTaxableBenefits
    - seniorityExempt
    - (hasSpouse ? DEDUCTIONS.spouse : 0)
    - numChildren * DEDUCTIONS.child
  )
  const bracket   = SALARY_TAX_BRACKETS.findLast(b => taxableBase >= b.min)
  const taxAmount = Math.max(0, taxableBase * bracket.rate - bracket.offset)

  return {
    taxableBase,
    taxAmount,
    effectiveRate: grossSalary > 0 ? taxAmount / grossSalary : 0,
    bracketUsed: bracket,
    seniorityExempt,
    seniorityTaxable,
  }
}

export function calculateNonResidentSalaryTax(grossSalary = 0) {
  return {
    taxableBase:   grossSalary,
    taxAmount:     grossSalary * NON_RESIDENT_SALARY_RATE,
    effectiveRate: NON_RESIDENT_SALARY_RATE,
  }
}
