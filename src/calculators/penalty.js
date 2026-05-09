import { PENALTIES } from '../constants/taxRates'

export function calculatePenalty({ shortfall = 0, actualTax = 0, monthsLate = 0 }) {
  const errorRate = actualTax > 0 ? shortfall / actualTax : Infinity
  let penaltyRate, penaltyType
  if (errorRate < 0.10) { penaltyRate = PENALTIES.underDeclarationLow;  penaltyType = 'low_error' }
  else if (errorRate < 1) { penaltyRate = PENALTIES.underDeclarationHigh; penaltyType = 'high_error' }
  else                    { penaltyRate = PENALTIES.assessmentByGDT;      penaltyType = 'gdt_assessment' }
  const penaltyAmount  = shortfall * penaltyRate
  const interestAmount = shortfall * PENALTIES.monthlyInterest * monthsLate
  return { penaltyRate, penaltyAmount, interestAmount, totalDue: shortfall + penaltyAmount + interestAmount, errorRate, penaltyType }
}
