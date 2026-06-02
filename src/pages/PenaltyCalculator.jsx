import { useState } from 'react'
import { calculatePenalty } from '../calculators/penalty'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount, clampInt } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import ResultActions from '../components/ui/ResultActions'
import TaxDetails from '../components/shared/TaxDetails'
import { PENALTY_DETAILS } from '../constants/taxDetails'
import './Page.css'

const PENALTY_LABELS = {
  low_error:      'ការធ្វេសប្រហែស - ពិន័យ ១០%',
  high_error:     'ការធ្វេសប្រហែសធ្ងន់ធ្ងរ - ពិន័យ ២៥%',
  gdt_assessment: 'ការវាយតម្លៃឯកតោភាគីដោយអគ្គនាយកដ្ឋានពន្ធដារ - ពិន័យ ៤០%',
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
      <p className="page__eyebrow">ពិន័យ និងការប្រាក់</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាពិន័យ</h1>
      <p className="page__subtitle">ប៉ាន់ស្មានពិន័យ និងការប្រាក់ប្រចាំខែសម្រាប់ការប្រកាសខ្វះ ឬការដាក់ប្រកាសយឺត។</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label" htmlFor="shortfall">ចំនួនពន្ធខ្វះ ឬបង់មិនគ្រប់ (រៀល)</label>
          <input
            id="shortfall"
            className="form-input"
            type="number"
            min="0"
            placeholder="ឧ. ៥០០,០០០"
            value={shortfall}
            onChange={e => setShortfall(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="actualTax">ចំនួនពន្ធត្រឹមត្រូវដែលគួរបង់ (រៀល)</label>
          <input
            id="actualTax"
            className="form-input"
            type="number"
            min="0"
            placeholder="ឧ. ២,០០០,០០០"
            value={actualTax}
            onChange={e => setActualTax(e.target.value)}
            required
          />
          <small className="form-hint">ប្រើសម្រាប់កំណត់ថា កំហុសស្ថិតក្នុងកម្រិតធ្វេសប្រហែស ឬធ្វេសប្រហែសធ្ងន់ធ្ងរ។</small>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="months">ចំនួនខែយឺត</label>
          <input
            id="months"
            className="form-input"
            type="number"
            min="0"
            max="120"
            value={monthsLate}
            onChange={e => setMonthsLate(e.target.value)}
          />
          <small className="form-hint">ការប្រាក់គិត ១.៥% ក្នុងមួយខែលើចំនួនពន្ធខ្វះ។</small>
        </div>

        <div className="form-group form-group--inline">
          <label className="radio-label">
            <input type="checkbox" checked={unilateralAssessment} onChange={e => setUnilateralAssessment(e.target.checked)} />
            អគ្គនាយកដ្ឋានពន្ធដារបានវាយតម្លៃឯកតោភាគី (អត្រាពិន័យ ៤០%)
          </label>
        </div>

        <div className="form-group form-group--inline">
          <label className="radio-label">
            <input type="checkbox" checked={obstruction} onChange={e => setObstruction(e.target.checked)} />
            មានការរារាំង ឬខ្វះឯកសារ (បន្ថែមពិន័យ ២,០០០,០០០ រៀល)
          </label>
        </div>

        <button type="submit" className="btn-primary">គណនាពិន័យ</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          <ResultActions filename="penalty-summary.txt" />
          <ResultCard label="អត្រាកំហុស" value={formatPercent(result.errorRate)} />
          <ResultCard label="ប្រភេទពិន័យ" value={PENALTY_LABELS[result.penaltyType]} />
          <ResultCard label="អត្រាពិន័យ" value={formatPercent(result.penaltyRate)} />
          <ResultCard label="ចំនួនពិន័យ" value={formatKHR(result.penaltyAmount)} />
          <ResultCard label="ការប្រាក់ ១.៥% ក្នុងមួយខែ" value={formatKHR(result.interestAmount)} />
          {result.obstructionFine > 0 && (
            <ResultCard label="ប្រាក់ពិន័យសម្រាប់ការរារាំង" value={formatKHR(result.obstructionFine)} />
          )}
          <ResultCard label="ចំនួនសរុបត្រូវបង់" value={formatKHR(result.totalDue)} highlight />
        </div>
      )}

      <TaxDetails data={PENALTY_DETAILS} />
    </div>
  )
}
