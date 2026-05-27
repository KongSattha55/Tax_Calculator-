import { WITHHOLDING_TAX_RATES } from '../constants/taxRates'

export const WITHHOLDING_PAYMENT_TYPES = [
  {
    key: 'residentServiceRoyaltyInterest',
    label: 'និវាសនជន៖ សេវាកម្ម សិទ្ធិប្រើប្រាស់ ឬការប្រាក់',
    rate: WITHHOLDING_TAX_RATES.residentServiceRoyaltyInterest,
  },
  {
    key: 'residentRent',
    label: 'និវាសនជន៖ ការជួលទ្រព្យចលនវត្ថុ ឬអចលនវត្ថុ',
    rate: WITHHOLDING_TAX_RATES.residentRent,
  },
  {
    key: 'residentBankFixedDepositInterest',
    label: 'និវាសនជន៖ ការប្រាក់ប្រាក់បញ្ញើមានកាលកំណត់',
    rate: WITHHOLDING_TAX_RATES.residentBankFixedDepositInterest,
  },
  {
    key: 'residentBankSavingsInterest',
    label: 'និវាសនជន៖ ការប្រាក់ប្រាក់សន្សំមិនមានកាលកំណត់',
    rate: WITHHOLDING_TAX_RATES.residentBankSavingsInterest,
  },
  {
    key: 'selfAssessmentRent',
    label: 'អ្នកជាប់ពន្ធប្រព័ន្ធស្វ័យប្រកាស៖ ការជួល',
    rate: WITHHOLDING_TAX_RATES.selfAssessmentRent,
  },
  {
    key: 'selfAssessmentInterestRoyalty',
    label: 'អ្នកជាប់ពន្ធប្រព័ន្ធស្វ័យប្រកាស៖ ការប្រាក់ ឬសិទ្ធិប្រើប្រាស់',
    rate: WITHHOLDING_TAX_RATES.selfAssessmentInterestRoyalty,
  },
  {
    key: 'nonResidentCambodiaSource',
    label: 'អនិវាសនជន៖ ការទូទាត់មានប្រភពពីកម្ពុជា',
    rate: WITHHOLDING_TAX_RATES.nonResidentCambodiaSource,
  },
]

export function calculateWithholdingTax(amount = 0, paymentType = 'residentServiceRoyaltyInterest') {
  const type = WITHHOLDING_PAYMENT_TYPES.find(item => item.key === paymentType) ?? WITHHOLDING_PAYMENT_TYPES[0]
  const taxAmount = amount * type.rate

  return {
    paymentType: type.key,
    label: type.label,
    rate: type.rate,
    grossAmount: amount,
    taxAmount,
    netPayment: Math.max(0, amount - taxAmount),
  }
}
