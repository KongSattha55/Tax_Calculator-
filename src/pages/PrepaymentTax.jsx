import { useState } from 'react'
import { calculatePrepaymentTax } from '../calculators/prepaymentTax'
import { formatKHR } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
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
      <p className="page__eyebrow">Prepayment Tax on Income</p>
      <h1 className="page__title">Prepayment Tax Calculator</h1>
      <p className="page__subtitle">1% monthly advance on turnover (excl. VAT) — credited against your annual 9% Profit Tax.</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label">Is the turnover amount you'll enter VAT-inclusive?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" checked={vatInclusive} onChange={() => { setVatInclusive(true); setResult(null) }} />
              Including VAT (will be divided by 1.1)
            </label>
            <label className="radio-label">
              <input type="radio" checked={!vatInclusive} onChange={() => { setVatInclusive(false); setResult(null) }} />
              Excluding VAT (used as-is)
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="turnover">
            Monthly Turnover (KHR)
          </label>
          <input
            id="turnover"
            className="form-input"
            type="number"
            min="0"
            placeholder={vatInclusive ? 'e.g. 110,000,000' : 'e.g. 100,000,000'}
            value={turnover}
            onChange={e => setTurnover(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Calculate Tax</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading">Calculation Results</h2>
          <ResultCard label="Turnover (excl. VAT)"   value={formatKHR(result.base)} />
          <ResultCard label="Prepayment Tax (1%)"    value={formatKHR(result.taxAmount)} highlight />
          <ResultCard label="Annual Estimate (× 12)" value={formatKHR(result.annualEstimate)} />
          <p className="results__note">
            File using <strong>Form PT 01</strong> (centralized) or <strong>PT 01 (branch)</strong>. Due between the 1st and the <strong>20th of the following month</strong>.
          </p>
        </div>
      )}

      <TaxDetails data={PREPAYMENT_TAX_DETAILS} />
    </div>
  )
}
