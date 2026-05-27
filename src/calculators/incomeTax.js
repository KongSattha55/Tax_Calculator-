import { ANNUAL_INCOME_TAX_BRACKETS, INCOME_TAX_RATES } from '../constants/taxRates'

export const INCOME_TAXPAYER_TYPES = [
  {
    key: 'legalEntity',
    label: 'នីតិបុគ្គល',
    description: '២០% លើប្រាក់ចំណូលជាប់ពន្ធប្រចាំឆ្នាំ',
    rate: INCOME_TAX_RATES.legalEntity,
  },
  {
    key: 'progressiveIndividual',
    label: 'បុគ្គល សហគ្រាសឯកបុគ្គល ឬចំណែកសហកម្មសិទ្ធិ',
    description: 'អត្រាកើនតាមកម្រិតពី ០% ដល់ ២០%',
    rate: null,
  },
  {
    key: 'naturalResources',
    label: 'សកម្មភាពប្រេង ឧស្ម័ន ឬធនធានធម្មជាតិ',
    description: '៣០% លើប្រាក់ចំណូលជាប់ពន្ធប្រចាំឆ្នាំ',
    rate: INCOME_TAX_RATES.naturalResources,
  },
  {
    key: 'qipTaxHoliday',
    label: 'គម្រោងវិនិយោគមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់ក្នុងអំឡុងលើកលែងពន្ធ',
    description: '០% ក្នុងរយៈពេលលើកលែងពន្ធដែលបានអនុម័ត',
    rate: INCOME_TAX_RATES.qipTaxHoliday,
  },
  {
    key: 'propertyRiskInsurancePremium',
    label: 'បុព្វលាភធានារ៉ាប់រងទ្រព្យសម្បត្តិ ឬហានិភ័យ',
    description: '៥% លើបុព្វលាភសរុបដែលទទួលបាន',
    rate: INCOME_TAX_RATES.propertyRiskInsurancePremium,
  },
  {
    key: 'lifeInsuranceAndOther',
    label: 'ធានារ៉ាប់រងជីវិត ឬសកម្មភាពធានារ៉ាប់រងផ្សេងៗ',
    description: '២០% លើប្រាក់ចំណូលជាប់ពន្ធ',
    rate: INCOME_TAX_RATES.lifeInsuranceAndOther,
  },
]

export function calculateIncomeTax(taxableIncome = 0, taxpayerType = 'legalEntity') {
  const type = INCOME_TAXPAYER_TYPES.find(item => item.key === taxpayerType) ?? INCOME_TAXPAYER_TYPES[0]

  if (type.key === 'progressiveIndividual') {
    const bracket = ANNUAL_INCOME_TAX_BRACKETS.findLast(item => taxableIncome >= item.min)
    const taxAmount = Math.max(0, taxableIncome * bracket.rate - bracket.offset)

    return {
      taxpayerType: type.key,
      label: type.label,
      taxableIncome,
      rate: bracket.rate,
      offset: bracket.offset,
      taxAmount,
      effectiveRate: taxableIncome > 0 ? taxAmount / taxableIncome : 0,
    }
  }

  const taxAmount = taxableIncome * type.rate

  return {
    taxpayerType: type.key,
    label: type.label,
    taxableIncome,
    rate: type.rate,
    offset: 0,
    taxAmount,
    effectiveRate: taxableIncome > 0 ? taxAmount / taxableIncome : 0,
  }
}
