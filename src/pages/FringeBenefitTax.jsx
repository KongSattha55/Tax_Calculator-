import { useState } from 'react'
import { calculateFringeBenefitTax } from '../calculators/fringeBenefit'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import TaxDetails from '../components/shared/TaxDetails'
import { FRINGE_BENEFIT_DETAILS } from '../constants/taxDetails'
import './Page.css'

const BENEFIT_LINES = [
  { key: 'vehicle',   label: 'Vehicles (company car, etc.)' },
  { key: 'housing',   label: 'Housing / accommodation' },
  { key: 'utilities', label: 'Water, electricity, phone' },
  { key: 'meals',     label: 'Meals' },
  { key: 'staff',     label: 'Domestic staff in residence' },
  { key: 'loanGap',   label: 'Below-market-rate loan benefit (interest gap)' },
  { key: 'discount',  label: 'Discounted goods / services' },
  { key: 'education', label: 'Non-job-related education subsidy (incl. children)' },
  { key: 'insurance', label: 'Life/health insurance not uniformly provided' },
  { key: 'pension',   label: 'Pension contributions exceeding 10%' },
  { key: 'other',     label: 'Other taxable fringe benefits' },
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
      <p className="page__eyebrow">Fringe Benefit Tax</p>
      <h1 className="page__title">Fringe Benefit Tax Calculator</h1>
      <p className="page__subtitle">
        Employer withholds <strong>20%</strong> on the market value of fringe benefits provided to employees,
        per Prakas 1173 and Sarachor 011. Market value is the all-tax-included price.
      </p>

      <form className="page__form" onSubmit={handleCalculate}>
        {BENEFIT_LINES.map(b => (
          <div className="form-group" key={b.key}>
            <label className="form-label" htmlFor={b.key}>{b.label} (KHR)</label>
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

        <button type="submit" className="btn-primary">Calculate FBT</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading">Calculation Results</h2>
          <ResultCard label="Total Market Value"    value={formatKHR(result.marketValue)} />
          <ResultCard label="FBT Rate"              value={formatPercent(result.rate)} />
          <ResultCard label="Fringe Benefit Tax"    value={formatKHR(result.taxAmount)} highlight />
          <p className="results__note">
            Withhold and remit by the <strong>20th of the following month</strong>, together with salary tax.
            Benefits that are uniformly provided to all employees (e.g. company-wide health insurance) are exempt.
          </p>
        </div>
      )}

      <TaxDetails data={FRINGE_BENEFIT_DETAILS} />
    </div>
  )
}
