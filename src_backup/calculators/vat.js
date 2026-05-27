import { VAT_RATE } from '../constants/taxRates'

export function calcVATFromExclusive(amountExclVAT = 0) {
  const vatAmount = amountExclVAT * VAT_RATE
  return { vatAmount, totalInclVAT: amountExclVAT + vatAmount }
}

export function calcVATFromInclusive(amountInclVAT = 0) {
  const amountExclVAT = amountInclVAT / (1 + VAT_RATE)
  return { vatAmount: amountInclVAT - amountExclVAT, amountExclVAT }
}
