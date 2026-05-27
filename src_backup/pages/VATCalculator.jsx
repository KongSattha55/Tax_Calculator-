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
      <p className="page__eyebrow">Value Added Tax</p>
      <h1 className="page__title">VAT Calculator</h1>
      <p className="page__subtitle">Standard 10% Value Added Tax — calculate from a pre-tax or VAT-inclusive amount.</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label">Input Type</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" value="exclusive" checked={mode === 'exclusive'} onChange={() => { setMode('exclusive'); setResult(null) }} />
              Pre-tax amount (excl. VAT)
            </label>
            <label className="radio-label">
              <input type="radio" value="inclusive" checked={mode === 'inclusive'} onChange={() => { setMode('inclusive'); setResult(null) }} />
              VAT-inclusive amount
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="vatAmt">
            Amount (KHR) — {mode === 'exclusive' ? 'excluding VAT' : 'including VAT'}
          </label>
          <input
            id="vatAmt"
            className="form-input"
            type="number"
            min="0"
            placeholder="e.g. 1,000,000"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Calculate VAT</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading">Calculation Results</h2>
          {mode === 'exclusive' ? (<>
            <ResultCard label="Pre-tax Amount"    value={formatKHR(parseAmount(amount))} />
            <ResultCard label="VAT (10%)"         value={formatKHR(result.vatAmount)} highlight />
            <ResultCard label="Total (incl. VAT)" value={formatKHR(result.totalInclVAT)} />
          </>) : (<>
            <ResultCard label="VAT-inclusive Amount" value={formatKHR(parseAmount(amount))} />
            <ResultCard label="VAT Component (10%)"  value={formatKHR(result.vatAmount)} highlight />
            <ResultCard label="Pre-tax Amount"        value={formatKHR(result.amountExclVAT)} />
          </>)}
        </div>
      )}

      <TaxDetails data={VAT_DETAILS} />
    </div>
  )
}
