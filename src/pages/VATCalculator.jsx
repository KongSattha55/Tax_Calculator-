import { useState } from 'react'
import { calcVATFromExclusive, calcVATFromInclusive } from '../calculators/vat'
import { formatKHR } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import TaxDetails from '../components/shared/TaxDetails'
import { VAT_DETAILS } from '../constants/taxDetails'
import './Page.css'

export default function VATCalculator() {
  const [mode,   setMode]   = useState('exclusive')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    const val = parseAmount(amount)
    setResult(mode === 'exclusive' ? calcVATFromExclusive(val) : calcVATFromInclusive(val))
  }

  return (
    <div className="page">
      <p className="page__eyebrow">អាករលើតម្លៃបន្ថែម</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាអាករលើតម្លៃបន្ថែម</h1>
      <p className="page__subtitle">គណនាអាករលើតម្លៃបន្ថែមអត្រា ១០% ពីចំនួនមុនអាករ ឬចំនួនដែលរួមអាកររួច។</p>
      <a className="page__doc-link" href="/docs/VAT.pdf" target="_blank" rel="noopener noreferrer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        ឯកសារយោង៖ ឯកសារអាករ - អាករលើតម្លៃបន្ថែម
      </a>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label">ប្រភេទចំនួនទឹកប្រាក់</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" value="exclusive" checked={mode === 'exclusive'} onChange={() => { setMode('exclusive'); setResult(null) }} />
              ចំនួនមុនអាករ
            </label>
            <label className="radio-label">
              <input type="radio" value="inclusive" checked={mode === 'inclusive'} onChange={() => { setMode('inclusive'); setResult(null) }} />
              ចំនួនរួមអាករ
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vatAmt">
            ចំនួនទឹកប្រាក់ (រៀល) - {mode === 'exclusive' ? 'មិនរួមអាករ' : 'រួមអាករ'}
          </label>
          <input
            id="vatAmt"
            className="form-input"
            type="number"
            min="0"
            placeholder="ឧ. ១,០០០,០០០"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">គណនាអាករ</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          {mode === 'exclusive' ? (<>
            <ResultCard label="ចំនួនមុនអាករ" value={formatKHR(parseAmount(amount))} />
            <ResultCard label="អាករលើតម្លៃបន្ថែម ១០%" value={formatKHR(result.vatAmount)} highlight />
            <ResultCard label="ចំនួនសរុបរួមអាករ" value={formatKHR(result.totalInclVAT)} />
          </>) : (<>
            <ResultCard label="ចំនួនរួមអាករ" value={formatKHR(parseAmount(amount))} />
            <ResultCard label="ចំណែកអាករ ១០%" value={formatKHR(result.vatAmount)} highlight />
            <ResultCard label="ចំនួនមុនអាករ" value={formatKHR(result.amountExclVAT)} />
          </>)}
        </div>
      )}

      <TaxDetails data={VAT_DETAILS} />
    </div>
  )
}
