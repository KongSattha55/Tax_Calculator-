import { useState } from 'react'
import { calculateFringeBenefitTax } from '../calculators/fringeBenefit'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import ResultActions from '../components/ui/ResultActions'
import TaxDetails from '../components/shared/TaxDetails'
import { FRINGE_BENEFIT_DETAILS } from '../constants/taxDetails'
import './Page.css'

const BENEFIT_LINES = [
  { key: 'vehicle',   label: 'យានយន្ត ឬរថយន្តក្រុមហ៊ុន' },
  { key: 'housing',   label: 'លំនៅឋាន ឬកន្លែងស្នាក់នៅ' },
  { key: 'utilities', label: 'ទឹក ភ្លើង ទូរស័ព្ទ' },
  { key: 'meals',     label: 'អាហារ' },
  { key: 'staff',     label: 'បុគ្គលិកបម្រើក្នុងលំនៅឋាន' },
  { key: 'loanGap',   label: 'អត្ថប្រយោជន៍ពីប្រាក់កម្ចីអត្រាទាប' },
  { key: 'discount',  label: 'ទំនិញ ឬសេវាកម្មបញ្ចុះតម្លៃ' },
  { key: 'education', label: 'ប្រាក់ឧបត្ថម្ភសិក្សាមិនពាក់ព័ន្ធការងារ' },
  { key: 'insurance', label: 'ធានារ៉ាប់រងជីវិត ឬសុខភាពមិនផ្តល់ស្មើៗគ្នា' },
  { key: 'pension',   label: 'ភាគទានសោធនលើស ១០%' },
  { key: 'other',     label: 'អត្ថប្រយោជន៍បន្ថែមជាប់ពន្ធផ្សេងៗ' },
]

export default function FringeBenefitTax() {
  const [items,  setItems]  = useState(() => Object.fromEntries(BENEFIT_LINES.map(b => [b.key, ''])))
  const [result, setResult] = useState(null)

  function handleChange(key, value) {
    setItems(prev => ({ ...prev, [key]: value }))
  }

  function handleCalculate(e) {
    e.preventDefault()
    const total = BENEFIT_LINES.reduce((sum, b) => sum + parseAmount(items[b.key]), 0)
    setResult(calculateFringeBenefitTax(total))
  }

  return (
    <div className="page">
      <p className="page__eyebrow">ពន្ធលើអត្ថប្រយោជន៍បន្ថែម</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាពន្ធលើអត្ថប្រយោជន៍បន្ថែម</h1>
      <p className="page__subtitle">
        គណនា <strong>២០%</strong> លើតម្លៃទីផ្សារនៃអត្ថប្រយោជន៍បន្ថែមដែលនិយោជកផ្តល់ឱ្យនិយោជិត។
      </p>

      <form className="page__form" onSubmit={handleCalculate}>
        {BENEFIT_LINES.map(b => (
          <div className="form-group" key={b.key}>
            <label className="form-label" htmlFor={b.key}>{b.label} (រៀល)</label>
            <input
              id={b.key}
              className="form-input"
              type="number"
              min="0"
              placeholder="0"
              value={items[b.key]}
              onChange={e => handleChange(b.key, e.target.value)}
            />
          </div>
        ))}

        <button type="submit" className="btn-primary">គណនាពន្ធ</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          <ResultActions filename="fringe-benefit-tax-summary.txt" />
          <ResultCard label="តម្លៃទីផ្សារសរុប" value={formatKHR(result.marketValue)} />
          <ResultCard label="អត្រាពន្ធលើអត្ថប្រយោជន៍បន្ថែម" value={formatPercent(result.rate)} />
          <ResultCard label="ពន្ធលើអត្ថប្រយោជន៍បន្ថែម" value={formatKHR(result.taxAmount)} highlight />
          <p className="results__note" lang="km">
            ត្រូវកាត់ទុក និងបង់មុនថ្ងៃទី <strong>២០ នៃខែបន្ទាប់</strong> ជាមួយពន្ធលើប្រាក់បៀវត្ស។
            អត្ថប្រយោជន៍ដែលផ្តល់ស្មើៗគ្នាដល់បុគ្គលិកទាំងអស់អាចត្រូវបានលើកលែង។
          </p>
        </div>
      )}

      <TaxDetails data={FRINGE_BENEFIT_DETAILS} />
    </div>
  )
}
