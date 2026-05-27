import { useState } from 'react'
import { calculateMinimumTax } from '../calculators/minimumTax'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import TaxDetails from '../components/shared/TaxDetails'
import { MINIMUM_TAX_DETAILS } from '../constants/taxDetails'
import './Page.css'

export default function MinimumTax() {
  const [annualTurnover, setAnnualTurnover] = useState('')
  const [incomeTaxLiability, setIncomeTaxLiability] = useState('')
  const [vatInclusive, setVatInclusive] = useState(false)
  const [result, setResult] = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    setResult(calculateMinimumTax({
      annualTurnover: parseAmount(annualTurnover),
      incomeTaxLiability: parseAmount(incomeTaxLiability),
      vatInclusive,
    }))
  }

  return (
    <div className="page">
      <p className="page__eyebrow">ពន្ធអប្បបរមា</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាពន្ធអប្បបរមា</h1>
      <p className="page__subtitle">ប្រៀបធៀបពន្ធលើប្រាក់ចំណូលប្រចាំឆ្នាំជាមួយពន្ធអប្បបរមា ១% លើប្រាក់ចំណូលមិនរួមអាករលើតម្លៃបន្ថែម។</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label">តើប្រាក់ចំណូលប្រចាំឆ្នាំរួមអាករលើតម្លៃបន្ថែម ឬទេ?</label>
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
          <label className="form-label" htmlFor="annualTurnover">ប្រាក់ចំណូលប្រចាំឆ្នាំ (រៀល)</label>
          <input
            id="annualTurnover"
            className="form-input"
            type="number"
            min="0"
            placeholder={vatInclusive ? 'ឧ. ១,១០០,០០០,០០០' : 'ឧ. ១,០០០,០០០,០០០'}
            value={annualTurnover}
            onChange={e => setAnnualTurnover(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="incomeTaxLiability">ពន្ធលើប្រាក់ចំណូលដែលបានគណនា (រៀល)</label>
          <input
            id="incomeTaxLiability"
            className="form-input"
            type="number"
            min="0"
            placeholder="ឧ. ៨,០០០,០០០"
            value={incomeTaxLiability}
            onChange={e => setIncomeTaxLiability(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">ប្រៀបធៀបពន្ធអប្បបរមា</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          <ResultCard label="ប្រាក់ចំណូលមិនរួមអាករ" value={formatKHR(result.turnoverExclVAT)} />
          <ResultCard label="អត្រាពន្ធអប្បបរមា" value={formatPercent(result.rate, 0)} />
          <ResultCard label="ពន្ធអប្បបរមា" value={formatKHR(result.minimumTax)} />
          <ResultCard label="ពន្ធលើប្រាក់ចំណូលត្រូវបង់" value={formatKHR(result.incomeTaxLiability)} />
          <ResultCard label="ពន្ធប្រចាំឆ្នាំចុងក្រោយ" value={formatKHR(result.finalLiability)} highlight />
          <ResultCard label="ចំនួនបន្ថែមពីពន្ធអប្បបរមា" value={formatKHR(result.additionalDueFromMinimumTax)} />
          <p className="results__note" lang="km">
            ពន្ធអប្បបរមា {result.minimumTaxApplies ? 'ត្រូវបានអនុវត្ត ព្រោះខ្ពស់ជាងពន្ធលើប្រាក់ចំណូល។' : 'មិនត្រូវបានអនុវត្ត ព្រោះពន្ធលើប្រាក់ចំណូលស្មើ ឬខ្ពស់ជាងពន្ធអប្បបរមា។'}
          </p>
        </div>
      )}

      <TaxDetails data={MINIMUM_TAX_DETAILS} />
    </div>
  )
}
