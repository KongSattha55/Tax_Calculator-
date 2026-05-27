import { useState } from 'react'
import { calculatePenalty } from '../calculators/penalty'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount, clampInt } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import TaxDetails from '../components/shared/TaxDetails'
import { PENALTY_DETAILS } from '../constants/taxDetails'
import './Page.css'

const PENALTY_LABELS = {
  low_error:      'Negligence (error ≤ 10%) — 10% penalty',
  high_error:     'Serious negligence (error > 10%) — 25% penalty',
  gdt_assessment: 'GDT unilateral assessment — 40% penalty',
}

export default function PenaltyCalculator() {
  const [shortfall,            setShortfall]            = useState('')
  const [actualTax,            setActualTax]            = useState('')
  const [monthsLate,           setMonthsLate]           = useState(1)
  const [unilateralAssessment, setUnilateralAssessment] = useState(false)
  const [obstruction,          setObstruction]          = useState(false)
  const [result,               setResult]               = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    setResult(calculatePenalty({
      shortfall:            parseAmount(shortfall),
      actualTax:            parseAmount(actualTax),
      monthsLate:           clampInt(monthsLate, 0, 120),
      unilateralAssessment,
      obstruction,
    }))
  }

  return (
    <div className="page">
      <p className="page__eyebrow">Penalty & Interest</p>
      <h1 className="page__title">Penalty Calculator</h1>
      <p className="page__subtitle">Estimate GDT penalties and monthly interest for under-declaration or late filing.</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label" htmlFor="shortfall">Tax Shortfall / Underpaid Amount (KHR)</label>
          <input
            id="shortfall"
            className="form-input"
            type="number"
            min="0"
            placeholder="e.g. 500,000"
            value={shortfall}
            onChange={e => setShortfall(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="actualTax">Correct Tax That Should Have Been Paid (KHR)</label>
          <input
            id="actualTax"
            className="form-input"
            type="number"
            min="0"
            placeholder="e.g. 2,000,000"
            value={actualTax}
            onChange={e => setActualTax(e.target.value)}
            required
          />
          <small className="form-hint">Used to determine whether the error rate is ≤ 10% (negligence) or above (serious negligence).</small>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="months">Months Overdue</label>
          <input
            id="months"
            className="form-input"
            type="number"
            min="0"
            max="120"
            value={monthsLate}
            onChange={e => setMonthsLate(e.target.value)}
          />
          <small className="form-hint">Interest accrues at 1.5% per month on the shortfall.</small>
        </div>

        <div className="form-group form-group--inline">
          <label className="radio-label">
            <input type="checkbox" checked={unilateralAssessment} onChange={e => setUnilateralAssessment(e.target.checked)} />
            GDT issued a unilateral tax assessment (overrides error-rate tier — flat 40%)
          </label>
        </div>

        <div className="form-group form-group--inline">
          <label className="radio-label">
            <input type="checkbox" checked={obstruction} onChange={e => setObstruction(e.target.checked)} />
            Obstruction (missing records, refusing inspection, not registered, etc.) — adds 2,000,000 KHR fine
          </label>
        </div>

        <button type="submit" className="btn-primary">Calculate Penalty</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading">Calculation Results</h2>
          <ResultCard label="Error Rate"                   value={formatPercent(result.errorRate)} />
          <ResultCard label="Penalty Category"             value={PENALTY_LABELS[result.penaltyType]} />
          <ResultCard label="Penalty Rate"                 value={formatPercent(result.penaltyRate)} />
          <ResultCard label="Penalty Amount"               value={formatKHR(result.penaltyAmount)} />
          <ResultCard label="Interest (1.5%/mo × months)"  value={formatKHR(result.interestAmount)} />
          {result.obstructionFine > 0 && (
            <ResultCard label="Obstruction Fine"           value={formatKHR(result.obstructionFine)} />
          )}
          <ResultCard label="Total Amount Due"             value={formatKHR(result.totalDue)} highlight />
        </div>
      )}

      <TaxDetails data={PENALTY_DETAILS} />
    </div>
  )
}
