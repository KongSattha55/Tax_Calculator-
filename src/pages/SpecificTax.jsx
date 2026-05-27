import { useState } from 'react'
import { calculateSpecificTax, SPECIFIC_TAX_GOODS } from '../calculators/specificTax'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import TaxDetails from '../components/shared/TaxDetails'
import { SPECIFIC_TAX_DETAILS } from '../constants/taxDetails'
import './Page.css'

export default function SpecificTax() {
  const [goodsKey, setGoodsKey] = useState('beer')
  const [amount,   setAmount]   = useState('')
  const [result,   setResult]   = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    setResult(calculateSpecificTax(parseAmount(amount), goodsKey))
  }

  return (
    <div className="page">
      <p className="page__eyebrow">ពន្ធជាក់លាក់</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាពន្ធជាក់លាក់លើទំនិញ និងសេវាកម្ម</h1>
      <p className="page__subtitle">គណនាពន្ធជាក់លាក់លើទំនិញ និងសេវាកម្មជាក់លាក់ ដូចជា ស្រា បារី យានយន្ត និងទូរគមនាគមន៍។</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">ប្រភេទទំនិញ / សេវាកម្ម</label>
          <select
            className="form-input"
            value={goodsKey}
            onChange={e => { setGoodsKey(e.target.value); setResult(null) }}
          >
            {SPECIFIC_TAX_GOODS.map(g => (
              <option key={g.key} value={g.key}>
                {g.label} — {Math.round(g.rate * 100)}%
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="stAmount">
            តម្លៃជាប់ពន្ធ (មុនពន្ធ, រៀល)
          </label>
          <input
            id="stAmount"
            className="form-input"
            type="number"
            min="0"
            placeholder="ឧ. ១,០០០,០០០"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
          <small className="form-hint">បញ្ចូលតម្លៃចេញពីរោងចក្រ (ក្នុងប្រទេស) ឬ តម្លៃ+ដឹកជញ្ជូន+ធានា + ពន្ធគយ (នាំចូល) ដោយមិនរួមអ.ត.ប។</small>
        </div>

        <button type="submit" className="btn-primary">គណនាពន្ធ</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          <ResultCard label="ប្រភេទទំនិញ / សេវាកម្ម" value={result.label} />
          <ResultCard label="អត្រាពន្ធជាក់លាក់" value={formatPercent(result.rate)} />
          <ResultCard label="តម្លៃមុនពន្ធ" value={formatKHR(result.taxableValue)} />
          <ResultCard label="ចំនួនពន្ធជាក់លាក់" value={formatKHR(result.taxAmount)} highlight />
          <ResultCard label="តម្លៃសរុប (មុន អ.ត.ប)" value={formatKHR(result.totalInclTax)} />
          <p className="results__note" lang="km">
            <strong>ចំណាំ:</strong> អ.ត.ប ១០% ត្រូវអនុវត្តបន្ទាប់ លើតម្លៃ {formatKHR(result.totalInclTax)} (តម្លៃ + ពន្ធជាក់លាក់)។
          </p>
        </div>
      )}

      <TaxDetails data={SPECIFIC_TAX_DETAILS} />
    </div>
  )
}
