import { useState } from 'react'
import { calculateIncomeTax, INCOME_TAXPAYER_TYPES } from '../calculators/incomeTax'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import TaxDetails from '../components/shared/TaxDetails'
import { INCOME_TAX_DETAILS } from '../constants/taxDetails'
import './Page.css'

export default function IncomeTax() {
  const [taxableIncome, setTaxableIncome] = useState('')
  const [taxpayerType, setTaxpayerType] = useState(INCOME_TAXPAYER_TYPES[0].key)
  const [result, setResult] = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    setResult(calculateIncomeTax(parseAmount(taxableIncome), taxpayerType))
  }

  const selectedType = INCOME_TAXPAYER_TYPES.find(type => type.key === taxpayerType)

  return (
    <div className="page">
      <p className="page__eyebrow">ពន្ធលើប្រាក់ចំណូល</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាពន្ធលើប្រាក់ចំណូល</h1>
      <p className="page__subtitle">ប៉ាន់ស្មានពន្ធប្រចាំឆ្នាំសម្រាប់នីតិបុគ្គល អាជីវកម្មបុគ្គល គម្រោងវិនិយោគ និងសកម្មភាពធានារ៉ាប់រង។</p>
      <a className="page__doc-link" href="/docs/Tax_06_IncomeTax.pdf" target="_blank" rel="noopener noreferrer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        ឯកសារយោង: ឯកសារទី ០៦ – ពន្ធលើប្រាក់ចំណូល
      </a>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label" htmlFor="taxpayerType">ប្រភេទអ្នកជាប់ពន្ធ / សកម្មភាព</label>
          <select
            id="taxpayerType"
            className="form-input"
            value={taxpayerType}
            onChange={e => { setTaxpayerType(e.target.value); setResult(null) }}
          >
            {INCOME_TAXPAYER_TYPES.map(type => (
              <option key={type.key} value={type.key}>
                {type.label}
              </option>
            ))}
          </select>
          {selectedType && <span className="form-hint">{selectedType.description}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="taxableIncome">ប្រាក់ចំណូលជាប់ពន្ធប្រចាំឆ្នាំ / មូលដ្ឋានពាក់ព័ន្ធ (រៀល)</label>
          <input
            id="taxableIncome"
            className="form-input"
            type="number"
            min="0"
            placeholder="ឧ. ២៥០,០០០,០០០"
            value={taxableIncome}
            onChange={e => setTaxableIncome(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">គណនាពន្ធលើប្រាក់ចំណូល</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          <ResultCard label="មូលដ្ឋានជាប់ពន្ធ" value={formatKHR(result.taxableIncome)} />
          <ResultCard label="អត្រាដែលបានអនុវត្ត" value={formatPercent(result.rate, 0)} />
          <ResultCard label="ចំនួនកាត់បន្ថយ" value={formatKHR(result.offset)} />
          <ResultCard label="ពន្ធលើប្រាក់ចំណូល" value={formatKHR(result.taxAmount)} highlight />
          <ResultCard label="អត្រាពន្ធមានប្រសិទ្ធភាព" value={formatPercent(result.effectiveRate)} />
          <p className="results__note" lang="km">
            ការប៉ាន់ស្មាននេះគឺចំនួនពន្ធសរុបប្រចាំឆ្នាំ មុនឥណទានពន្ធបរទេស ឥណទានភាគលាភ ពន្ធកាត់ទុក ពន្ធបង់ប្រាក់រំដោះ និងឥណទានឆ្នាំមុន។
          </p>
        </div>
      )}

      <TaxDetails data={INCOME_TAX_DETAILS} />
    </div>
  )
}
