import { useState } from 'react'
import { calculatePrepaymentTax } from '../calculators/prepaymentTax'
import { formatKHR } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import ResultActions from '../components/ui/ResultActions'
import TaxDetails from '../components/shared/TaxDetails'
import { PREPAYMENT_TAX_DETAILS } from '../constants/taxDetails'
import './Page.css'

export default function PrepaymentTax() {
  const [turnover,     setTurnover]     = useState('')
  const [vatInclusive, setVatInclusive] = useState(true)
  const [result,       setResult]       = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    setResult(calculatePrepaymentTax(parseAmount(turnover), { vatInclusive }))
  }

  return (
    <div className="page">
      <p className="page__eyebrow">ពន្ធបង់ប្រាក់រំដោះ</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាពន្ធបង់ប្រាក់រំដោះ</h1>
      <p className="page__subtitle">គណនា ១% លើប្រាក់ចំណូលប្រចាំខែ ដែលមិនរួមអាករលើតម្លៃបន្ថែម។</p>
      <a className="page__doc-link" href="/docs/Tax_03_Prepayment.pdf" target="_blank" rel="noopener noreferrer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        ឯកសារយោង៖ ឯកសារទី ០៣ - ពន្ធបង់ប្រាក់រំដោះ
      </a>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label">តើចំនួនប្រាក់ចំណូលដែលបញ្ចូលរួមអាករលើតម្លៃបន្ថែម ឬទេ?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" checked={vatInclusive} onChange={() => { setVatInclusive(true); setResult(null) }} />
              រួមអាករ
            </label>
            <label className="radio-label">
              <input type="radio" checked={!vatInclusive} onChange={() => { setVatInclusive(false); setResult(null) }} />
              មិនរួមអាករ
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="turnover">
            ប្រាក់ចំណូលប្រចាំខែ (រៀល)
          </label>
          <input
            id="turnover"
            className="form-input"
            type="number"
            min="0"
            placeholder={vatInclusive ? 'ឧ. ១១០,០០០,០០០' : 'ឧ. ១០០,០០០,០០០'}
            value={turnover}
            onChange={e => setTurnover(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">គណនាពន្ធ</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          <ResultActions filename="prepayment-tax-summary.txt" />
          <ResultCard label="ប្រាក់ចំណូលមិនរួមអាករ" value={formatKHR(result.base)} />
          <ResultCard label="ពន្ធបង់ប្រាក់រំដោះ ១%" value={formatKHR(result.taxAmount)} highlight />
          <ResultCard label="ការប៉ាន់ស្មានប្រចាំឆ្នាំ" value={formatKHR(result.annualEstimate)} />
          <p className="results__note" lang="km">
            ប្រើ <strong>ទម្រង់ ពត ០១</strong> សម្រាប់ការដាក់ប្រកាស។ ថ្ងៃកំណត់ចន្លោះថ្ងៃទី ១ ដល់ថ្ងៃទី <strong>២០ នៃខែបន្ទាប់</strong>។
          </p>
        </div>
      )}

      <TaxDetails data={PREPAYMENT_TAX_DETAILS} />
    </div>
  )
}
