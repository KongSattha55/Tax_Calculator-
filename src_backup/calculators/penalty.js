import { PENALTIES } from '../constants/taxRates'

// Per Tax_01 (p.12–14):
//   - Negligence (errorRate ≤ 10%):     10% penalty + 1.5%/month interest
//   - Serious negligence (errorRate > 10%): 25% penalty + 1.5%/month interest
//   - Unilateral GDT assessment:        40% penalty + 1.5%/month interest (flag, not a ratio)
//   - Obstruction:                      flat 2,000,000 KHR fine (can stack)
export function calculatePenalty({
  shortfall = 0,
  actualTax = 0,
  monthsLate = 0,
  unilateralAssessment = false,
  obstruction = false,
}) {
  const errorRate = actualTax > 0 ? shortfall / actualTax : 0

  let penaltyRate, penaltyType
  if (unilateralAssessment) {
    penaltyRate = PENALTIES.assessmentByGDT
    penaltyType = 'gdt_assessment'
  } else if (errorRate <= 0.10) {
    penaltyRate = PENALTIES.underDeclarationLow
    penaltyType = 'low_error'
  } else {
    penaltyRate = PENALTIES.underDeclarationHigh
    penaltyType = 'high_error'
  }

  const penaltyAmount    = shortfall * penaltyRate
  const interestAmount   = shortfall * PENALTIES.monthlyInterest * monthsLate
  const obstructionFine  = obstruction ? PENALTIES.obstruction : 0
  const totalDue         = shortfall + penaltyAmount + interestAmount + obstructionFine

  return {
    errorRate,
    penaltyRate,
    penaltyType,
    penaltyAmount,
    interestAmount,
    obstructionFine,
    totalDue,
  }
}
