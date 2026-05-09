import { useState } from 'react'
import { calculatePrepaymentTax } from '../calculators/prepaymentTax'
import { formatKHR } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import './Page.css'

export default function PrepaymentTax() {
  const [turnover, setTurnover] = useState('')
  const [result,   setResult]   = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    setResult(calculatePrepaymentTax(parseAmount(turnover)))
  }

  return (
    <div className="page">
      <p className="page__eyebrow">Prepayment Tax on Income</p>
      <h1 className="page__title">Prepayment Tax Calculator</h1>
      <p className="page__subtitle">1% monthly advance on turnover (excl. VAT) — credited against your annual 9% Profit Tax.</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label" htmlFor="turnover">
            Monthly Turnover <strong>including VAT</strong> (KHR)
          </label>
          <input
            id="turnover"
            className="form-input"
            type="number"
            min="0"
            placeholder="e.g. 110,000,000"
            value={turnover}
            onChange={e => setTurnover(e.target.value)}
            required
          />
          <small className="form-hint">VAT is stripped automatically by dividing by 1.1.</small>
        </div>
        <button type="submit" className="btn-primary">Calculate Tax</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading">Calculation Results</h2>
          <ResultCard label="Turnover (excl. VAT)"   value={formatKHR(result.base)} />
          <ResultCard label="Prepayment Tax (1%)"    value={formatKHR(result.taxAmount)} highlight />
          <ResultCard label="Annual Estimate (x 12)" value={formatKHR(result.annualEstimate)} />
          <p className="results__note">
            File using <strong>Form VAT 01</strong> (or VAT 01-B for branches). Due by the <strong>20th of the following month</strong>.
          </p>
        </div>
      )}
    </div>
  )
}
