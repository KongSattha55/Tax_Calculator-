import { useState } from 'react'
import { calculatePropertyTax } from '../calculators/propertyTax'
import { formatKHR } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import TaxDetails from '../components/shared/TaxDetails'
import { PROPERTY_TAX_DETAILS } from '../constants/taxDetails'
import './Page.css'

export default function PropertyTax() {
  const [marketValue, setMarketValue] = useState('')
  const [result,      setResult]      = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    setResult(calculatePropertyTax(parseAmount(marketValue)))
  }

  return (
    <div className="page">
      <p className="page__eyebrow">ពន្ធលើអចលនទ្រព្យ</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាពន្ធលើអចលនទ្រព្យ</h1>
      <p className="page__subtitle">គណនាពន្ធប្រចាំឆ្នាំ ០.១% លើដី អាគារ និងសំណង់ ដោយ ១០០,០០០,០០០ រៀលដំបូងត្រូវបានលើកលែង។</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label" htmlFor="marketValue">តម្លៃទីផ្សាររបស់អចលនទ្រព្យ (រៀល)</label>
          <input
            id="marketValue"
            className="form-input"
            type="number"
            min="0"
            placeholder="ឧ. ៥០០,០០០,០០០"
            value={marketValue}
            onChange={e => setMarketValue(e.target.value)}
            required
          />
          <small className="form-hint">តម្លៃទីផ្សារសរុបរបស់ដី អាគារ ឬសំណង់ (មិនមែនតម្លៃប៉ាន់ស្មាន)។</small>
        </div>

        <button type="submit" className="btn-primary">គណនាពន្ធ</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          <ResultCard label="តម្លៃទីផ្សារ" value={formatKHR(result.marketValue)} />
          <ResultCard label="តម្លៃប៉ាន់ស្មាន (×៨០%)" value={formatKHR(result.assessedValue)} />
          <ResultCard label="ការលើកលែង (១០០ លានរៀល)" value={formatKHR(result.exemptionApplied)} />
          <ResultCard label="មូលដ្ឋានជាប់ពន្ធ" value={formatKHR(result.taxableBase)} />
          <ResultCard label="ពន្ធប្រចាំឆ្នាំ (០.១%)" value={formatKHR(result.taxAmount)} highlight />
          {result.taxAmount === 0 && (
            <p className="results__note" lang="km">
              អចលនទ្រព្យនេះ<strong>ត្រូវបានលើកលែងពន្ធ</strong> ដោយតម្លៃប៉ាន់ស្មានមិនលើស ១០០,០០០,០០០ រៀល។
            </p>
          )}
          {result.taxAmount > 0 && (
            <p className="results__note" lang="km">
              ត្រូវបង់ប្រាក់មុន <strong>ថ្ងៃទី ៣០ ខែកញ្ញា</strong> នៃឆ្នាំពន្ធ។
            </p>
          )}
        </div>
      )}

      <TaxDetails data={PROPERTY_TAX_DETAILS} />
    </div>
  )
}
